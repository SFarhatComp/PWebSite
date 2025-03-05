from flask import Flask, request, jsonify, send_file, abort
from flask_cors import CORS
from flask_mail import Mail, Message
import os

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

@app.route('/')
def index():
    try:
        return app.send_static_file('index.html')
    except:
        return "Welcome to the CV Website API. Frontend is not built yet."

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0') 