import sys
sys.path.append('backend/src')
import unittest
import datetime
from flask import Flask
from flask import Blueprint, jsonify               #import dependancies
from flask import current_app as app
from flask_login import login_required, login_user, logout_user
from flask_cors import cross_origin
from flask_cors import CORS
from flask import request
from flask_migrate import Migrate
from models.user import User
from extensions import db, bcrypt
import jwt
from routes.auth import auth_bp
from app import create_app

class AuthTestApp(unittest.TestCase):
    def setUp(self):
        self.app=create_app()
        self.app.config['CORS_HEADERS'] = 'Content-Type'
        CORS(self.app, support_credentials=True)
        CORS(self.app, resources={r"/*": {"origins": "*"}})
        self.app.debug = True
        migrate = Migrate(self.app, db)
        self.app=self.app.test_client()

    def test_register_route(self):
        '''Test the register route of our app'''
        response=self.app.post('/auth/register',json=dict(email='test_email@gmail.com',first_name='test_first',last_name='test_last',password='password123'))
        #print(response.status_code)
        assert response.status_code==201
    
    def test_login_route(self):
        '''Test the login route of our app'''
        response=self.app.post('/auth/login',json=dict(email='test_email@gmail.com',password='password123'),follow_redirects=True)
        print(response.status_code)
        assert response.status_code==200
    """  
    def test_login_route_wrong_password(self):
        '''Test the login route of our app with a registered user with a wrong password'''
        response=self.app.post('/login',json=dict(email='aaronadb@gmail.com',password='flashcards'))
        assert response.status_code==400
        
    def test_login_route_unregistered_user(self):
        '''Test the login route of our app with an unregistered user'''
        response=self.app.post('/login',json=dict(email='aarondiasbarreto@gmail.com',password='flashcards123'))
        assert response.status_code==400
    """ 

if __name__=="__main__":
    unittest.main()
