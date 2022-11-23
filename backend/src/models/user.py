import uuid
from flask import Flask
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin
try:
 from ..extensions import db
except ImportError:
 from extensions import db
from sqlalchemy.dialects.postgresql import UUID
from config import Config

login_manager = LoginManager()

app=Flask(__name__, instance_relative_config=True)
app.config.from_object(Config)
db.init_app(app)
 
class User(db.Model, UserMixin):
    __tablename__ = 'users'
 
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = db.Column(db.String(80), unique=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    password_hash = db.Column(db.String())
    created_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    updated_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False, server_onupdate=db.func.now())
 
    def set_password(self,password):
        self.password_hash = generate_password_hash(password)
     
    def check_password(self,password):
        return check_password_hash(self.password_hash,password)
    
    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def to_json(self):
        return {
            'id': str(self.id),
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'created_on': self.created_on,
            'updated_on': self.updated_on
        }
 

@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))
