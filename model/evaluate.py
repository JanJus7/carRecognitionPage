import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt
from collections import Counter

MODEL_PATH = "model_best_72p_2.keras"
VAL_DIR = "dataset/data_split/val"
IMG_SIZE = (240, 240)
BATCH_SIZE = 32

model = tf.keras.models.load_model(MODEL_PATH)

val_datagen = ImageDataGenerator(rescale=1./255)
val_generator = val_datagen.flow_from_directory(
    VAL_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    shuffle=False
)

pred_probs = model.predict(val_generator, verbose=1)
y_pred_labels = np.argmax(pred_probs, axis=1)
y_true = val_generator.classes
class_names = list(val_generator.class_indices.keys())

label_counter = Counter(y_true)
top_labels = [label for label, _ in label_counter.most_common(40)]

mask = np.isin(y_true, top_labels)
filtered_y_true = y_true[mask]
filtered_y_pred = y_pred_labels[mask]

cm = confusion_matrix(filtered_y_true, filtered_y_pred, labels=top_labels)
top_class_names = [class_names[i] for i in top_labels]

plt.figure(figsize=(18, 14))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=top_class_names,
            yticklabels=top_class_names)
plt.xlabel("Prediction")
plt.ylabel("True class")
plt.title("Macierz pomyłek (Top 40 klas)")
plt.tight_layout()
plt.savefig("confusion_matrix_top40.png")
plt.show()
