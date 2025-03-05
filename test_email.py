#!/usr/bin/env python3

import os
import sys
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from flask import Flask
from flask_mail import Mail, Message

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Get email configuration from .env
EMAIL_USER = os.environ.get('EMAIL_USER')
EMAIL_PASS = os.environ.get('EMAIL_PASS')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL')

if not EMAIL_USER or not EMAIL_PASS:
    logger.error("ERROR: EMAIL_USER or EMAIL_PASS not set in .env file")
    sys.exit(1)

if not RECIPIENT_EMAIL:
    RECIPIENT_EMAIL = EMAIL_USER
    logger.warning("RECIPIENT_EMAIL not set, using EMAIL_USER as recipient")

def test_flask_mail():
    """Test email sending using Flask-Mail"""
    logger.info("=" * 50)
    logger.info("TESTING FLASK-MAIL")
    logger.info("=" * 50)
    
    # Configure Flask app
    app = Flask(__name__)
    app.config.update(
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=465,
        MAIL_USE_SSL=True,
        MAIL_USERNAME=EMAIL_USER,
        MAIL_PASSWORD=EMAIL_PASS,
        MAIL_DEFAULT_SENDER=EMAIL_USER
    )
    
    mail = Mail(app)
    
    # Log configuration
    logger.info(f"Mail configuration:")
    logger.info(f"  Server: {app.config['MAIL_SERVER']}:{app.config['MAIL_PORT']}")
    logger.info(f"  SSL: {app.config['MAIL_USE_SSL']}")
    logger.info(f"  Username: {app.config['MAIL_USERNAME']}")
    logger.info(f"  Recipient: {RECIPIENT_EMAIL}")
    
    # Create a test message
    with app.app_context():
        try:
            msg = Message(
                subject="Test Email from Flask-Mail",
                recipients=[RECIPIENT_EMAIL],
                body="This is a test email sent from the Flask-Mail test script."
            )
            logger.info(f"Sending test email to {RECIPIENT_EMAIL}")
            mail.send(msg)
            logger.info("✅ Flask-Mail: Email sent successfully!")
            return True
        except Exception as e:
            logger.error(f"❌ Flask-Mail: Failed to send email: {str(e)}", exc_info=True)
            return False

def test_smtp():
    """Test email sending using direct SMTP"""
    logger.info("=" * 50)
    logger.info("TESTING DIRECT SMTP")
    logger.info("=" * 50)
    
    # Log configuration
    logger.info(f"SMTP configuration:")
    logger.info(f"  Server: smtp.gmail.com:587")
    logger.info(f"  Username: {EMAIL_USER}")
    logger.info(f"  Recipient: {RECIPIENT_EMAIL}")
    
    # Create message
    msg = MIMEMultipart()
    msg['From'] = EMAIL_USER
    msg['To'] = RECIPIENT_EMAIL
    msg['Subject'] = "Test Email from Direct SMTP"
    
    body = "This is a test email sent from the direct SMTP test script."
    msg.attach(MIMEText(body, 'plain'))
    
    try:
        logger.info("Connecting to SMTP server: smtp.gmail.com:587")
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        logger.info(f"Logging in as {EMAIL_USER}")
        server.login(EMAIL_USER, EMAIL_PASS)
        text = msg.as_string()
        logger.info(f"Sending email to {RECIPIENT_EMAIL}")
        server.sendmail(EMAIL_USER, RECIPIENT_EMAIL, text)
        server.quit()
        logger.info("✅ Direct SMTP: Email sent successfully!")
        return True
    except Exception as e:
        logger.error(f"❌ Direct SMTP: Failed to send email: {str(e)}", exc_info=True)
        return False

if __name__ == "__main__":
    logger.info("Email Test Script - Testing both email methods")
    
    # Print environment setup
    logger.info("Environment:")
    logger.info(f"  EMAIL_USER: {'✓ Set' if EMAIL_USER else '✗ Not set'}")
    logger.info(f"  EMAIL_PASS: {'✓ Set' if EMAIL_PASS else '✗ Not set'}")
    logger.info(f"  RECIPIENT_EMAIL: {'✓ Set' if RECIPIENT_EMAIL != EMAIL_USER else '✗ Not set (using EMAIL_USER)'}")
    
    # Run tests
    flask_mail_result = test_flask_mail()
    smtp_result = test_smtp()
    
    # Summary
    logger.info("=" * 50)
    logger.info("TEST RESULTS")
    logger.info("=" * 50)
    logger.info(f"Flask-Mail: {'SUCCESS ✅' if flask_mail_result else 'FAILED ❌'}")
    logger.info(f"Direct SMTP: {'SUCCESS ✅' if smtp_result else 'FAILED ❌'}")
    
    if flask_mail_result and smtp_result:
        logger.info("All tests PASSED! ✅")
        sys.exit(0)
    elif flask_mail_result or smtp_result:
        logger.info("Some tests PASSED, some FAILED ⚠️")
        sys.exit(1)
    else:
        logger.info("All tests FAILED! ❌")
        sys.exit(2) 