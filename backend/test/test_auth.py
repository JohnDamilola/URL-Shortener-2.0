import sys
sys.path.append('backend/src')
import unittest
from models.user import User
from routes.auth import auth_bp
from app import app

class AuthTestApp(unittest.TestCase):
    def setUp(self):
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
            response=self.app.patch('/user/update/'+str(id),json=dict(email='new_test4@gmail.com',first_name='test4_first',last_name='new_test4_last',password='new_password4'))
        assert response.status_code==201
    
    def test_update_route_random_id(self):
        '''Test the update route of our app for a random user id'''
        id='f74fa42c-fc00-43c2-a2f6-9c0a27g59a0e'
        response=self.app.patch('/user/update/'+str(id),json=dict(email='new_test4@gmail.com',first_name='test4_first',last_name='new_test4_last',password='new_password4'))
        assert response.status_code==400
        
    def test_delete_route(self):
        '''Test the delete route of our app for an already registered user'''
        _=self.app.post('/auth/register',json=dict(email='test5@gmail.com',first_name='test5_first',last_name='test5_last',password='password5'))
        with self.flask_app.app_context():
            _=self.app.post('/auth/login',json=dict(email='test5@gmail.com',password='password5'))
            user=User.query.filter_by(email='test5@gmail.com').first()
            id=user.id
            response=self.app.delete('/user/delete/'+str(id))
        assert response.status_code==200
        
    def test_delete_route_random_id(self):
        '''Test the delete route of our app for a random user id'''
        id='f74fa42c-fc00-43c2-a2f6-9c0a27g59a0e'
        response=self.app.delete('/user/delete/'+str(id))
        assert response.status_code==400
        
        
#if __name__=="__main__":
    #unittest.main()
