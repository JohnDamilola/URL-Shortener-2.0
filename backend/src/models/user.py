from functools import wraps
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin
from flask import g, jsonify, request, redirect
try:
 from ..extensions import db
except ImportError:
 from extensions import db
from sqlalchemy.dialects.postgresql import UUID

login_manager = LoginManager()

 
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
    return User.query.get(id)

@login_manager.request_loader
def load_user_from_request(request):
    user_id = request.args.get('user_id')
    if user_id:
        user = User.query.filter_by(id=user_id).first()
        if user and user.is_authenticated:
            return user
    return None

def login_required2():
    def decorator(f):
        @wraps(f)
        def wrap(*args, **kwargs):
            # if user is not logged in, redirect to login page   
            user_id = request.args.get('user_id')
            # get user via some ORM system
            user = User.query.filter_by(id=user_id).first()
            if not user_id or not user or not user.is_authenticated:
                return jsonify(
                    message = "Please login first",
                    status = 401
                ), 401
            # make user available down the pipeline via flask.g
            g.user = user
            # finally call f. f() now haves access to g.user
            return f(*args, **kwargs)
    
        return wrap
    return decorator
