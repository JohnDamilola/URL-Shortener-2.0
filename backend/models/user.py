from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin
from ..extensions import db
 
login_manager = LoginManager()
 
class User(db.Model, UserMixin):
    __tablename__ = 'users'
 
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    password_hash = db.Column(db.String())
 
    def set_password(self,password):
        self.password_hash = generate_password_hash(password)
     
    def check_password(self,password):
        return check_password_hash(self.password_hash,password)
    
    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def to_json(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name
        }
 
 
@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))