import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import matplotlib.pyplot as plt
import os

MODEL_PATH = "model_best_72p_2.keras"
IMAGE_PATH = "myPhotos/test4.jpg"
IMG_SIZE = (240, 240)

model = tf.keras.models.load_model(MODEL_PATH)

train_dir = "dataset/data_split/train"
class_names = sorted(os.listdir(train_dir))

img = image.load_img(IMAGE_PATH, target_size=IMG_SIZE)
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0) / 255.0

pred = model.predict(img_array)[0]
class_id = np.argmax(pred)
confidence = pred[class_id]

print(f"[RESULT] Przewidywana klasa: {class_names[class_id]} ({confidence:.2%})")

plt.imshow(img)
plt.title(f"{class_names[class_id]} ({confidence:.2%})")
plt.axis("off")
plt.show()
