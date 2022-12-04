import sys
sys.path.append('backend/src')
import unittest
from flask_login import login_user
from models.user import User
from models.links import Link, db
from app import create_app, register_blueprints, register_extensions
import datetime
import uuid

class LinkTestApp(unittest.TestCase):
    def setUp(self):
        self.flask_app=create_app()
        ctx = self.flask_app.test_request_context()
        ctx.push()
        self.app=self.flask_app.test_client()
        
    def test_create_route(self):
        """Test the create link route of our app"""
        _=self.app.post('/auth/register',json=dict(email='test6@gmail.com',first_name='test6_first',last_name='test6_last',password='password6'))
        with self.app:
            self.app.post('/auth/login',json=dict(email='test6@gmail.com',password='password6'),follow_redirects=True)
            user=User.query.filter_by(email='test6@gmail.com').first()
            login_user(user)
            #db.session.add(user)
            #db.session.commit()
            uid=user.id
            response=self.app.post('/links/create',json=dict(id=uuid.uuid4(),user_id=uid,long_url='https://google.com',title='Google',disabled=False,utm_source='test6_source',utm_medium='test6_medium',utm_campaign='test6_campaign',utm_term='test6_term',utm_content='test6_content',password_hash='link_password',expire_on=datetime.datetime(2022,11,25)), follow_redirects=True)
            print("create",response.status_code)
        assert response.status_code==201
    
    def test_link_route(self):
        """Test the get link route of our app"""
        _=self.app.post('/auth/register',json=dict(email='test7@gmail.com',first_name='test7_first',last_name='test7_last',password='password7'))
        with self.flask_app.app_context():
            _=self.app.post('/auth/login',json=dict(email='test7@gmail.com',password='password7'))
            user=User.query.filter_by(email='test7@gmail.com').first()
            uid=user.id
            link_id=uuid.uuid4()
            _=self.app.post('/links/create',json=dict(id=link_id,user_id=uid,long_url='https://yahoo.in',title='Yahoo',disabled=False,utm_source='test6_source',utm_medium='test6_medium',utm_campaign='test6_campaign',utm_term='test6_term',utm_content='test6_content',password_hash='link_password',expire_on=datetime.datetime(2022,11,25)))
            response=self.app.get('/links/'+str(link_id))
        print("link",response.status_code)
        assert response.status_code==200
    
    def test_link_all_route(self):
        """Test the get all links route of our app"""
        _=self.app.post('/auth/register',json=dict(email='test8@gmail.com',first_name='test8_first',last_name='test8_last',password='password8'))
        with self.flask_app.app_context():
            user=User.query.filter_by(email='test8@gmail.com').first()
            uid=user.id
            _=self.app.post('/auth/login',json=dict(email='test8@gmail.com',password='password8'))
            _=self.app.post('/links/create',json=dict(id=uuid.uuid4(),user_id=uid,long_url='https://google.in',title='Google2',disabled=False,utm_source='test6_source',utm_medium='test6_medium',utm_campaign='test6_campaign',utm_term='test6_term',utm_content='test6_content',password_hash='link_password',expire_on=datetime.datetime(2022,11,25)))
            _=self.app.post('/links/create',json=dict(id=uuid.uuid4(),user_id=uid,long_url='https://yahoo.com',title='Yahoo2',disabled=False,utm_source='test6_source',utm_medium='test6_medium',utm_campaign='test6_campaign',utm_term='test6_term',utm_content='test6_content',password_hash='link_password',expire_on=datetime.datetime(2022,11,25)))
            response=self.app.get('/links/all',query_string=dict(localId=uid))
        print("all",response.status_code)
        assert response.status_code==200
        
    def test_link_update_route_valid(self):
        """Test the update link route of our app with a valid link id"""
        _=self.app.post('/auth/register',json=dict(email='test9@gmail.com',first_name='test9_first',last_name='test9_last',password='password9'))
        with self.flask_app.app_context():
            user=User.query.filter_by(email='test9@gmail.com').first()
            uid=user.id
            link_id=uuid.uuid4()
            _=self.app.post('/links/create',json=dict(id=link_id,user_id=uid,long_url='https://facebook.com',title='Facebook',disabled=False,utm_source='test6_source',utm_medium='test6_medium',utm_campaign='test6_campaign',utm_term='test6_term',utm_content='test6_content',password_hash='link_password',expire_on=datetime.datetime(2022,11,25)))
            response=self.app.patch('/links/update/'+str(link_id),json=dict(id=link_id ,user_id=uid, stub='new_stub', long_url='new_long_url', title='new_title', disabled=False, utm_source='test6_source', utm_medium='test6_medium', utm_campaign='test6_campaign', utm_term='test6_term', utm_content='test6_content', password_hash='new_password', expire_on=datetime.datetime(2022,11,25)))
        print("update valid",response.status_code)
        assert response.status_code==201
   
    def test_link_update_route_invalid(self):
        """Test the update link route of our app with an invalid link id"""
        _=self.app.post('/auth/register',json=dict(email='test10@gmail.com',first_name='test10_first',last_name='test10_last',password='password10'))
        with self.flask_app.app_context():
            user=User.query.filter_by(email='test10@gmail.com').first()
            uid=user.id
            link_id=uuid.uuid4()
            response=self.app.patch('/links/update/'+str(link_id),json=dict(id=link_id ,user_id=uid, stub='new_stub', long_url='new_long_url', title='new_title', disabled=False, utm_source='test6_source', utm_medium='test6_medium', utm_campaign='test6_campaign', utm_term='test6_term', utm_content='test6_content', password_hash='new_password', expire_on=datetime.datetime(2022,11,25)))
        print("update invalid",response.status_code)
        assert response.status_code==400     
        
    
    def test_link_delete_route_valid(self):
        """Test the delete link route of our app with a valid link id"""
        _=self.app.post('/auth/register',json=dict(email='test11@gmail.com',first_name='test11_first',last_name='test11_last',password='password11'))
        with self.flask_app.app_context():
            user=User.query.filter_by(email='test11@gmail.com').first()
            uid=user.id
            link_id=uuid.uuid4()
            _=self.app.post('/links/create',json=dict(id=link_id,user_id=uid,long_url='https://facebook.in',title='Facebook2',disabled=False,utm_source='test6_source',utm_medium='test6_medium',utm_campaign='test6_campaign',utm_term='test6_term',utm_content='test6_content',password_hash='link_password',expire_on=datetime.datetime(2022,11,25)))
            response=self.app.delete('/links/delete/'+str(link_id))
        print("delete valid",response.status_code)
        assert response.status_code==200
      
      
#if __name__=="__main__":
    #unittest.main()
