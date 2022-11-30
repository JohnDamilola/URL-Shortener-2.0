import sys
sys.path.append('backend/src')
import unittest
from models.user import User
from app import app
import datetime

class AuthTestApp(unittest.TestCase):
    def setUp(self):
        self.flask_app=app
        self.app=self.flask_app.test_client()
        
    def test_create_route(self):
        _=self.app.post('/auth/register',json=dict(email='test6@gmail.com',first_name='test6_first',last_name='test6_last',password='password6'))
        with self.flask_app.app_context():
            user=User.query.filter_by(email='test6@gmail.com').first()
            uid=user.id
            response=self.app.post('/link/create',json=dict(id='f74fa000-fc00-43c0-a0f0-9c0a27g00a0e',user_id=uid,long_url='https://google.com',title='Google',disabled=False,utm_source='test6_source',utm_medium='test6_medium',utm_campaign='test6_campaign',utm_term='test6_term',utm_content='test6_content',password_hash='link_password',expire_on=datetime.datetime(2022,11,25)))
        print("Create 201",response.status_code)
        assert response.status_code==201
    """
    def test_link_route(self):
      _=self.app.post('/auth/register',json=dict(email='test7@gmail.com',first_name='test7_first',last_name='test7_last',password='password7'))
      with self.flask_app.app_context():
            user=User.query.filter_by(email='test7@gmail.com').first()
            id=user.id
            response=self.app.get('/link/'+str(id))
      print(response.status_code)
      assert response.status_code==200
      """
      
      
if __name__=="__main__":
    unittest.main()
