import sys
sys.path.append('backend/src')
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from backend.config import config
from backend.extensions import db, bcrypt
from backend.src.routes.auth import auth_bp
from backend.src.models.user import User, login_manager
import unittest

class AuthTestApp(unittest.TestCase):
    def setUp(self):
        self.app=Flask(__name__, instance_relative_config=False)
        self.app.config.from_object(config['development'])
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        with self.app.app_context():
            self.app.register_blueprint(auth_bp)
            self.app.register_blueprint(shorten_links_bp)
        with self.app.app_context():
            db.init_app(self.app)
            bcrypt.init_app(self.app)
            login_manager.init_app(self.app)
        self.app=self.app.test_client()

    def test_index_get_route(self):
        '''Test the index route of our app'''
        response=self.app.get('/')
        assert response.status_code==200

if __name__=="__main__":
    unittest.main()
