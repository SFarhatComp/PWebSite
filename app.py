from flask import Flask, request, jsonify, send_file, abort, send_from_directory, redirect
from flask_cors import CORS
from flask_mail import Mail, Message
import os
import yaml
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder='build', static_url_path='/')
CORS(app)

# Configure mail settings
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 465))
app.config['MAIL_USE_SSL'] = os.environ.get('MAIL_USE_SSL', 'True').lower() == 'true'
app.config['MAIL_USE_TLS'] = os.environ.get('MAIL_USE_TLS', 'False').lower() == 'true'
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASS')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('EMAIL_USER')

# Log mail configuration (without password)
logger.info(f"Mail configuration: SERVER={app.config['MAIL_SERVER']}, PORT={app.config['MAIL_PORT']}, USER={app.config['MAIL_USERNAME']}")

mail = Mail(app)

# Add middleware to redirect www to non-www if accessed directly
@app.before_request
def redirect_www():
    host = request.host.lower()
    if host.startswith('www.'):
        non_www_host = host[4:]
        # Build full URL with scheme, non-www host, and the rest of the URL
        new_url = f"{request.scheme}://{non_www_host}{request.path}"
        if request.query_string:
            new_url += f"?{request.query_string.decode('utf-8')}"
        
        logger.info(f"Redirecting from {host} to {non_www_host} with 301 status")
        response = redirect(new_url, code=301)
        # Add cache control headers to make browsers remember this redirect
        response.headers['Cache-Control'] = 'max-age=31536000'  # Cache for 1 year
        return response

# Serve the default React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    try:
        logger.info(f"Received request for path: {path}")
        
        # If path starts with static, handle it via the serve_static route
        if path.startswith('static/'):
            return serve_static(path[7:])  # Remove 'static/' from the path
            
        # Check if the path exists in the build directory
        if path and os.path.exists(os.path.join(app.static_folder, path)):
            logger.info(f"File exists in build folder, serving directly")
            return send_from_directory(app.static_folder, path)
            
        # For any other route, serve the index.html file
        logger.info(f"Serving index.html for SPA routing")
        return send_from_directory(app.static_folder, 'index.html')
    except Exception as e:
        logger.error(f"Error serving file: {e}", exc_info=True)
        return f"Error serving file: {e}", 500

# Explicitly handle all frontend routes
@app.route('/cv')
@app.route('/projects')
@app.route('/contact')
def frontend_routes():
    return send_from_directory(app.static_folder, 'index.html')

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
    
    # Set recipient email, falling back to sender if not provided
    recipient_email = os.environ.get('RECIPIENT_EMAIL')
    if not recipient_email:
        recipient_email = os.environ.get('EMAIL_USER')
        logger.info(f"RECIPIENT_EMAIL not set, using EMAIL_USER: {recipient_email}")
    
    logger.info(f"Attempting to send email from {data['name']} <{data['email']}>")
    
    try:
        msg = Message(
            subject=f"CV Website Contact: {data['name']}",
            recipients=[recipient_email],
            body=f"From: {data['name']} <{data['email']}>\n\n{data['message']}"
        )
        logger.info(f"Created message to {recipient_email} with subject '{msg.subject}'")
        mail.send(msg)
        logger.info("Email sent successfully")
        return jsonify({'success': True})
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}", exc_info=True)
        return jsonify({'success': False, 'error': str(e)}), 500

# Email sending endpoint
@app.route('/api/send-email', methods=['POST'])
def send_email():
    data = request.json
    
    # Email configuration
    email_user = os.environ.get('EMAIL_USER')
    email_pass = os.environ.get('EMAIL_PASS')
    recipient_email = os.environ.get('RECIPIENT_EMAIL')
    
    # Set recipient email, falling back to sender if not provided
    if not recipient_email:
        recipient_email = email_user
        logger.info(f"RECIPIENT_EMAIL not set, using EMAIL_USER: {recipient_email}")

    logger.info(f"Attempting to send email via SMTP from {data.get('name')} <{data.get('email')}>")
    
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
        smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', 587))
        logger.info(f"Connecting to SMTP server: {smtp_server}:{smtp_port}")
        server = smtplib.SMTP(smtp_server, smtp_port)
        use_tls = os.environ.get('SMTP_USE_TLS', 'True').lower() == 'true'
        if use_tls:
            logger.info("Starting TLS")
            server.starttls()
        logger.info(f"Logging in as {email_user}")
        server.login(email_user, email_pass)
        text = msg.as_string()
        logger.info(f"Sending email to {recipient_email}")
        server.sendmail(email_user, recipient_email, text)
        server.quit()
        logger.info("Email sent successfully via SMTP")
        return jsonify({"success": True})
    except Exception as e:
        logger.error(f"Failed to send email via SMTP: {str(e)}", exc_info=True)
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

# Add this route to debug the Flask server routing
@app.route('/api/debug-routes')
def debug_routes():
    """Debug endpoint to check routes"""
    routes = []
    for rule in app.url_map.iter_rules():
        routes.append({
            'endpoint': rule.endpoint,
            'methods': list(rule.methods),
            'path': str(rule)
        })
    
    return jsonify({
        'routes': routes,
        'static_folder': app.static_folder,
        'static_url_path': app.static_url_path
    })

# Add this route to specifically handle static files
@app.route('/static/<path:filename>')
def serve_static(filename):
    logger.info(f"Requested static file: {filename}")
    
    # First try the regular static directory for our custom files
    static_dir = os.path.join(os.getcwd(), 'static')
    if os.path.exists(os.path.join(static_dir, filename)):
        logger.info(f"Found in static directory: {static_dir}")
        return send_from_directory('static', filename)
    
    # If not found, try the build/static directory for React files
    build_static_dir = os.path.join(os.getcwd(), 'build', 'static')
    if os.path.exists(os.path.join(build_static_dir, filename)):
        logger.info(f"Found in build/static directory: {build_static_dir}")
        return send_from_directory(os.path.join('build', 'static'), filename)
    
    # Check if it's a JS/CSS file (might be in the root of build/static)
    if filename.startswith('js/') or filename.startswith('css/'):
        file_parts = filename.split('/')
        if len(file_parts) > 1:
            subdir = file_parts[0]  # 'js' or 'css'
            file_name = '/'.join(file_parts[1:])  # everything else
            build_assets_dir = os.path.join(os.getcwd(), 'build', 'static', subdir)
            if os.path.exists(os.path.join(build_assets_dir, file_name)):
                logger.info(f"Found in build/static/{subdir}: {file_name}")
                return send_from_directory(os.path.join('build', 'static', subdir), file_name)
    
    # Log that we couldn't find the file
    logger.error(f"File not found in any static directories: {filename}")
    return f"Could not find static file: {filename}", 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0') 