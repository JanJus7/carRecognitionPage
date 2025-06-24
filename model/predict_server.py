from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from io import BytesIO
import os

MODEL_PATH = "model_best_72p_2.keras"
CLASS_NAMES_PATH = "class_names.txt"
IMG_SIZE = (240, 240)

model = tf.keras.models.load_model(MODEL_PATH)

if os.path.exists(CLASS_NAMES_PATH):
    with open(CLASS_NAMES_PATH, "r") as f:
        class_names = [line.strip() for line in f.readlines()]
else:
    raise FileNotFoundError(f"ClassNames file not found: {CLASS_NAMES_PATH}")

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file."}), 400

    try:
        img_file = request.files["file"]
        img_bytes = img_file.read()
        img = image.load_img(BytesIO(img_bytes), target_size=IMG_SIZE)
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        prediction = model.predict(img_array)[0]
        class_id = int(np.argmax(prediction))
        confidence = float(prediction[class_id])

        return jsonify({
            "label": class_names[class_id],
            "confidence": round(confidence, 4)
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
