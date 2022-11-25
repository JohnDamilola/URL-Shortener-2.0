import sys
sys.path.append('backend/src')
import unittest
import datetime
from flask import Flask
from flask import Blueprint, jsonify               #import dependancies
#from flask import current_app as app
from flask_login import login_required, login_user, logout_user
from flask_cors import cross_origin
from flask_cors import CORS
from flask import request
from flask_migrate import Migrate
from models.user import User
from extensions import db, bcrypt
import jwt
from routes.auth import auth_bp
#from app import create_app
from app import app

class AuthTestApp(unittest.TestCase):
    def setUp(self):
        #self.app=create_app()
        #self.app.config['CORS_HEADERS'] = 'Content-Type'
        #CORS(self.app, support_credentials=True)
        #CORS(self.app, resources={r"/*": {"origins": "*"}})
        #self.app.debug = True
        #migrate = Migrate(self.app, db)
        self.flask_app=app
        self.app=self.flask_app.test_client()

    def test_register_route_new_user(self):
        '''Test the register route of our app with an unregistered user'''
        response=self.app.post('/auth/register',json=dict(email='test1@gmail.com',first_name='test1_first',last_name='test1_last',password='password1'))
        assert response.status_code==201
        
    def test_register_route_old_user(self):
        '''Test the register route of our app with an already registered user'''
        response=self.app.post('/auth/register',json=dict(email='test1@gmail.com',first_name='test1_first',last_name='test1_last',password='password1'))
        assert response.status_code==400
  
    def test_login_route(self):
        '''Test the login route of our app with a registered user'''
        _=self.app.post('/auth/register',json=dict(email='test2@gmail.com',first_name='test2_first',last_name='test2_last',password='password2'))
        response=self.app.post('/auth/login',json=dict(email='test2@gmail.com',password='password2'),follow_redirects=True)
        assert response.status_code==200
      
    def test_login_route_wrong_password(self):
        '''Test the login route of our app with a registered user with a wrong password'''
        _=self.app.post('/auth/register',json=dict(email='test3@gmail.com',first_name='test3_first',last_name='test3_last',password='password3'))
        response=self.app.post('/auth/login',json=dict(email='test3@gmail.com',password='password'))
        assert response.status_code==400
        
    def test_login_route_unregistered_user(self):
        '''Test the login route of our app with an unregistered user'''
        response=self.app.post('/auth/login',json=dict(email='aaronadb@gmail.com',password='password123'))
        assert response.status_code==400
        
    def test_update_route(self):
        '''Test the update route of our app for an already registered user'''
        _=self.app.post('/auth/register',json=dict(email='test4@gmail.com',first_name='test4_first',last_name='test4_last',password='password4'))
        with self.flask_app.app_context():
            user=User.query.filter_by(email='test4@gmail.com').first()
            id=user.id
            response=self.app.post('/auth/update/<id>',json=dict(email='new_test4@gmail.com',first_name='test4_first',last_name='new_test4_last',password='new_password4'))
        print(id)
        print(response.status_code)
        assert response.status_code==201

if __name__=="__main__":
    unittest.main()
