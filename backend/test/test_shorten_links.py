import sys
sys.path.append('backend/src')
import unittest
from models.user import User
from app import app

class AuthTestApp(unittest.TestCase):
    def setUp(self):
        self.flask_app=app
        self.app=self.flask_app.test_client()
    
    def test_link_route(self):
      _=self.app.post('/auth/register',json=dict(email='test6@gmail.com',first_name='test6_first',last_name='test6_last',password='password6'))
      with self.flask_app.app_context():
            user=User.query.filter_by(email='test6@gmail.com').first()
            id=user.id
            response=self.app.get('/link/'+str(id))
      print(response.status_code)
      assert response.status_code==200
      
      
if __name__=="__main__":
    unittest.main()
