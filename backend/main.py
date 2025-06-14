from flask import Flask, jsonify
from pymongo import MongoClient
import redis

app = Flask(__name__)

mongo_client = MongoClient("mongodb://mongo:27017")
mongo_db = mongo_client["carx_db"]
print("Połączono z MongoDB")

redis_client = redis.Redis(host='redis', port=6379)
try:
    redis_client.ping()
    print("Połączono z Redis")
except redis.exceptions.ConnectionError:
    print("Redis nieosiągalny")

@app.route("/ping")
def ping():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
