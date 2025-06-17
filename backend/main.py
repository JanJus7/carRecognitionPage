from pymongo import MongoClient
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask import Flask, request, jsonify, session, send_from_directory
from flask_login import LoginManager, login_user, logout_user, login_required, current_user, UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2

app = Flask(__name__)
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = True
app.secret_key = os.environ.get("SECRET_KEY", "dev")
CORS(app, supports_credentials=True)
login_manager = LoginManager(app)

UPLOAD_FOLDER = os.environ.get("UPLOAD_DIR", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

pg_conn = psycopg2.connect(
    dbname=os.environ.get("POSTGRES_DB", "carxauth"),
    user=os.environ.get("POSTGRES_USER", "carxuser"),
    password=os.environ.get("POSTGRES_PASSWORD", "carxpass"),
    host=os.environ.get("POSTGRES_HOST", "postgres")
)
pg_conn.autocommit = True
pg_cursor = pg_conn.cursor()
pg_cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
""")

mongo_client = MongoClient("mongodb://mongo:27017")
mongo_db = mongo_client["carx_db"]

class User(UserMixin):
    def __init__(self, id, username):
        self.id = id
        self.username = username

@login_manager.user_loader
def load_user(user_id):
    pg_cursor.execute("SELECT id, username FROM users WHERE id = %s", (user_id,))
    row = pg_cursor.fetchone()
    return User(*row) if row else None

# Routes
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"error": "Missing fields"}), 400

    hashed_pw = generate_password_hash(password)
    try:
        pg_cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed_pw))
        return jsonify({"message": "User registered"}), 201
    except psycopg2.errors.UniqueViolation:
        return jsonify({"error": "Username exists"}), 409

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    pg_cursor.execute("SELECT id, password FROM users WHERE username = %s", (username,))
    user = pg_cursor.fetchone()
    if user and check_password_hash(user[1], password):
        user_obj = User(user[0], username)
        login_user(user_obj)
        return jsonify({"message": "Logged in"})
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out"})

@app.route("/me")
def me():
    if current_user.is_authenticated:
        return jsonify({"username": current_user.username})
    return jsonify({"error": "Not logged in"}), 401


@app.route("/photos", methods=["POST"])
@login_required
def upload_photo():
    file = request.files["file"]
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    mongo_db.photos.insert_one({"filename": filename, "user_id": current_user.id})
    return jsonify({"message": "Uploaded"}), 201


@app.route("/uploads/<filename>")
def serve_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route("/photos", methods=["GET"])
@login_required
def get_photos():
    photos = list(mongo_db.photos.find({"user_id": int(current_user.id)}, {"_id": 0}))
    return jsonify(photos)

@app.route("/health")
def health():
    return "OK", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
