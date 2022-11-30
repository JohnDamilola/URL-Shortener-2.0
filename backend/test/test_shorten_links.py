import sys
sys.path.append('backend/src')
import unittest
from models.user import User
from app import app
import datetime
import uuid

class AuthTestApp(unittest.TestCase):
    def setUp(self):
        self.flask_app=app
        self.app=self.flask_app.test_client()
        
    def test_create_route(self):
        """Test the create link route of our app"""
        _=self.app.post('/auth/register',json=dict(email='test6@gmail.com',first_name='test6_first',last_name='test6_last',password='password6'))
        with self.flask_app.app_context():
            user=User.query.filter_by(email='test6@gmail.com').first()
            uid=user.id
            response=self.app.post('/link/create',json=dict(id=uuid.uuid4(),user_id=uid,long_url='https://google.com',title='Google',disabled=False,utm_source='test6_source',utm_medium='test6_medium',utm_campaign='test6_campaign',utm_term='test6_term',utm_content='test6_content',password_hash='link_password',expire_on=datetime.datetime(2022,11,25)))
        assert response.status_code==201
    
    def test_link_route(self):
        """Test the get link route of our app"""
        _=self.app.post('/auth/register',json=dict(email='test7@gmail.com',first_name='test7_first',last_name='test7_last',password='password7'))
        with self.flask_app.app_context():
            user=User.query.filter_by(email='test7@gmail.com').first()
            id=user.id
            uid=user.id
            _=self.app.post('/link/create',json=dict(id=uuid.uuid4(),user_id=uid,long_url='https://yahoo.in',title='Yahoo',disabled=False,utm_source='test6_source',utm_medium='test6_medium',utm_campaign='test6_campaign',utm_term='test6_term',utm_content='test6_content',password_hash='link_password',expire_on=datetime.datetime(2022,11,25)))
            _=self.app.post('/link/create',json=dict(id=uuid.uuid4(),user_id=uid,long_url='https://yahoo.com',title='Yahoo2',disabled=False,utm_source='test6_source',utm_medium='test6_medium',utm_campaign='test6_campaign',utm_term='test6_term',utm_content='test6_content',password_hash='link_password',expire_on=datetime.datetime(2022,11,25)))
            response=self.app.get('/link/'+str(link_id))
        assert response.status_code==200
    
    def test_link_all_route(self):
        """Test the get all links route of our app"""
        _=self.app.post('/auth/register',json=dict(email='test8@gmail.com',first_name='test8_first',last_name='test8_last',password='password8'))
        with self.flask_app.app_context():
            user=User.query.filter_by(email='test8@gmail.com').first()
            id=user.id
            uid=user.id
            link_id=uuid.uuid4()
            _=self.app.post('/auth/login',json=dict(email='test8@gmail.com',password='password8'))
            _=self.app.post('/link/create',json=dict(id=link_id,user_id=uid,long_url='https://yahoo.in',title='Yahoo',disabled=False,utm_source='test6_source',utm_medium='test6_medium',utm_campaign='test6_campaign',utm_term='test6_term',utm_content='test6_content',password_hash='link_password',expire_on=datetime.datetime(2022,11,25)))
            response=self.app.get('/link/all',json=dict(localId=id))
            print(response.status_code)
        assert response.status_code==200
     
      
      
if __name__=="__main__":
    unittest.main()
