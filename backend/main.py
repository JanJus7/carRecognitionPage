from flask import Flask, jsonify, request
from pymongo import MongoClient
import redis

app = Flask(__name__)

mongo_client = MongoClient("mongodb://mongo:27017")
mongo_db = mongo_client["carx_db"]
print("Połączono z MongoDB")

redis_client = redis.Redis(host="redis", port=6379)
try:
    redis_client.ping()
    print("Połączono z Redis")
except redis.exceptions.ConnectionError:
    print("Redis nieosiągalny")


@app.route("/photos", methods=["POST"])
def add_photo():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Brak danych"}), 400
        mongo_db.photos.insert_one(data)
        return jsonify({"message": "Dodano zdjęcie"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/photos", methods=["GET"])
def get_photos():
    photos = list(mongo_db.photos.find({}, {"_id": 0}))
    return jsonify(photos)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
