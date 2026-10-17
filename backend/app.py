from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:5173",
    "https://www.stackwiseza.co.za",
    "https://stackwiseza.co.za",
])

@app.route("/api/contact", methods=["POST"])
def contact():
    data    = request.get_json(silent=True) or {}
    name    = data.get("name", "").strip()
    email   = data.get("email", "").strip()
    subject = data.get("subject", "").strip()
    message = data.get("message", "").strip()

    if not all([name, email, subject, message]):
        return jsonify({"error": "All fields are required."}), 400

    # For now just log it — add email sending when you have SMTP set up
    print(f"Contact form: {name} <{email}> — {subject}")
    print(f"Message: {message}")

    return jsonify({"success": True}), 200

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "StackWise API"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)