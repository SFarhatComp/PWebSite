from flask import Flask, request, jsonify, send_file, abort, send_from_directory
from flask_cors import CORS
from flask_mail import Mail, Message
import os
import yaml
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='build', static_url_path='/')
CORS(app)

# Configure mail settings
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASS')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('EMAIL_USER')

mail = Mail(app)

# Serve the default React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    try:
        if path and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')
    except Exception as e:
        app.logger.error(f"Error serving file: {e}")
        return f"Error serving file: {e}", 500

# Serve the content.yaml file
@app.route('/content.yaml')
def serve_content():
    try:
        return send_from_directory(os.path.dirname(os.path.abspath(__file__)), 'content.yaml')
    except Exception as e:
        app.logger.error(f"Error serving content.yaml: {e}")
        return f"Error serving content.yaml: {e}", 500

@app.route('/api/download-cv')
def download_cv():
    # Path to your CV PDF file
    cv_path = 'static/resume.pdf'
    if os.path.exists(cv_path):
        return send_file(cv_path, as_attachment=True)
    else:
        return "CV file not found", 404

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    
    # Basic validation
    if not data or not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({'success': False, 'error': 'All fields are required'}), 400
    
    try:
        msg = Message(
            subject=f"CV Website Contact: {data['name']}",
            recipients=[os.environ.get('RECIPIENT_EMAIL', os.environ.get('EMAIL_USER'))],
            body=f"From: {data['name']} <{data['email']}>\n\n{data['message']}"
        )
        mail.send(msg)
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# Email sending endpoint
@app.route('/api/send-email', methods=['POST'])
def send_email():
    data = request.json
    
    # Email configuration
    email_user = os.environ.get('EMAIL_USER')
    email_pass = os.environ.get('EMAIL_PASS')
    recipient_email = os.environ.get('RECIPIENT_EMAIL')
    
    # Create message
    msg = MIMEMultipart()
    msg['From'] = email_user
    msg['To'] = recipient_email
    msg['Subject'] = f"Contact Form Submission from {data.get('name')}"
    
    body = f"""
    Name: {data.get('name')}
    Email: {data.get('email')}
    
    Message:
    {data.get('message')}
    """
    
    msg.attach(MIMEText(body, 'plain'))
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(email_user, email_pass)
        text = msg.as_string()
        server.sendmail(email_user, recipient_email, text)
        server.quit()
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/debug')
def debug():
    """Debug endpoint to check file system and directories"""
    build_files = os.listdir(app.static_folder) if os.path.exists(app.static_folder) else []
    static_files = os.listdir('static') if os.path.exists('static') else []
    
    debug_info = {
        'static_folder': app.static_folder,
        'static_folder_exists': os.path.exists(app.static_folder),
        'build_files': build_files,
        'static_files': static_files,
        'content_yaml_exists': os.path.exists('content.yaml'),
        'working_directory': os.getcwd()
    }
    
    return jsonify(debug_info)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0') 