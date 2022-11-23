import os, sys
# sys.path.insert(0, os.path.abspath(".."))

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

# from backend.config import config
# from backend.extensions import db, bcrypt
# from backend.src.routes.auth import auth_bp
# from backend.src.models.user import User, login_manager
try:
    from .config import config
    from .extensions import db, bcrypt
    from .routes.auth import auth_bp
    from .routes.shorten_links import shorten_links_bp
    from .models.user import User, login_manager
except ImportError:
    from config import config
    from extensions import db, bcrypt
    from routes.auth import auth_bp
    from routes.shorten_links import shorten_links_bp
    from models.user import User, login_manager

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
        app.register_blueprint(shorten_links_bp)
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
