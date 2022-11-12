from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from backend.config import config
from backend.extensions import db, bcrypt
from backend.routes.auth import auth_bp
from backend.models.user import User, login_manager

def create_app():
    """Create Flask application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(config['development'])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    register_blueprints(app)
    register_extensions(app)
    return app

def register_blueprints(app):
    with app.app_context():
        app.register_blueprint(auth_bp)
    return None

def register_extensions(app):
    with app.app_context():
        db.init_app(app)
        bcrypt.init_app(app)
        login_manager.init_app(app)
    return None

app = create_app()
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, support_credentials=True)
CORS(app, resources={r"/*": {"origins": "*"}})

app.debug = True
migrate = Migrate(app, db)

@app.route("/")
def index():
    return "API for URL Shortener"