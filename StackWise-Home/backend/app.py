import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(
    app,
    origins=[
        "http://localhost:5173",
        "https://www.stackwiseza.co.za",
        "https://stackwiseza.co.za",
        "https://stack-wise-home*.vercel.app",
    ],
)

SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.zoho.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "hello@stackwiseza.co.za")
SMTP_PASS = os.environ.get("SMTP_PASS", "")
TO_EMAIL = "hello@stackwiseza.co.za"


def send_email(name, email, company, service, budget, message):
    if not SMTP_PASS:
        print(f"[mailer] No SMTP_PASS — skipping email")
        return

    msg = MIMEMultipart()
    msg["From"] = f"StackWise Website <{SMTP_USER}>"
    msg["To"] = TO_EMAIL
    msg["Subject"] = f"New enquiry from {name} — {service or 'General'}"
    msg["Reply-To"] = email

    body = f"""New contact form submission from www.stackwiseza.co.za

Name:     {name}
Email:    {email}
Company:  {company or 'Not provided'}
Service:  {service or 'Not specified'}
Budget:   {budget or 'Not specified'}

Message:
{message}

---
Reply directly to this email to respond to {name}.
"""
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)

    print(f"[mailer] Contact email sent from {email}")


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    company = (data.get("company") or "").strip()
    service = (data.get("service") or "").strip()
    budget = (data.get("budget") or "").strip()
    message = (data.get("message") or "").strip()
    consent = data.get("consent", False)

    if not all([name, email, message]):
        return jsonify({"error": "Name, email and message are required."}), 400

    if not consent:
        return jsonify({"error": "Consent is required."}), 400

    try:
        send_email(name, email, company, service, budget, message)
    except Exception as e:
        print(f"[mailer] Error: {e}")
        # Don't fail the request if email fails — log it
        return jsonify({"success": True, "note": "Message received"}), 200

    return jsonify({"success": True}), 200


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "StackWise API"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
