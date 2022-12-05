#
#MIT License
#
#Copyright (c) 2022 John Damilola, Leo Hsiang, Swarangi Gaurkar, Kritika Javali, Aaron Dias Barreto
#
#Permission is hereby granted, free of charge, to any person obtaining a copy
#of this software and associated documentation files (the "Software"), to deal
#in the Software without restriction, including without limitation the rights
#to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#copies of the Software, and to permit persons to whom the Software is
#furnished to do so, subject to the following conditions:
#
#The above copyright notice and this permission notice shall be included in all
#copies or substantial portions of the Software.
#
#THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
#SOFTWARE.


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
    from .routes.links import links_bp
    from .models.user import User, login_manager
except ImportError:
    from config import config
    from extensions import db, bcrypt
    from auth import auth_bp
    from links import links_bp
    from user import User, login_manager

def create_app():
    """Create Flask application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(config['development'])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    register_blueprints(app)
    register_extensions(app)
    return app

def register_blueprints(app):
    """Register Blueprints to the flask app"""
    with app.app_context():
        app.register_blueprint(auth_bp)
        app.register_blueprint(links_bp)
    return None

def register_extensions(app):
    """Register Extensions to the flask app"""
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
