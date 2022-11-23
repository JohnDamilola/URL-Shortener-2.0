from sqlalchemy.dialects.postgresql import JSON

import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin
from ..extensions import db
from sqlalchemy.dialects.postgresql import UUID
from datetime import date

login_manager = LoginManager()

class Link(db.Model):
    __tablename__ = 'links'
 
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    stub = db.Column(db.String(10), unique=True)
    long_url = db.Column(db.String(100))
    disabled = db.Column(db.Boolean, default=False, nullable=False)
    utm_source = db.Column(db.String(100))
    utm_medium = db.Column(db.String(100))
    utm_campaign = db.Column(db.String(100))
    utm_term = db.Column(db.String(100))
    utm_content = db.Column(db.String(100))
    #password_hash = db.Column(db.String())
    expire_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=True)
    created_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    updated_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False, server_onupdate=db.func.now())
		# make a relationship with 'User' model
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'))

    def __init__(self,user_id,stub,long_url,disabled, utm_source, utm_medium, utm_campaign,utm_term, utm_content, expire_on):
        self.user_id=user_id
        self.stub=stub
        self.long_url = long_url
        self.disabled=disabled
        self.utm_source=utm_source
        self.utm_medium=utm_medium
        self.utm_campaign=utm_campaign
        self.utm_term=utm_term
        self.utm_content=utm_content
        self.created_on = date.today().strftime("%Y/%m/%d")
        self.expire_on=expire_on

    def to_json(self):
        return {
        'id': str(self.id),
        'user_id':self.user_id,
        'stub':self.stub,
        'long_url' : self.long_url,
        'disabled':self.disabled,
        'utm_source':self.utm_source,
        'utm_medium':self.utm_medium,
        'utm_campaign':self.utm_campaign,
        'utm_term':self.utm_term,
        'utm_content':self.utm_content,
        'expire_on':self.expire_on,
        'created_on':self.created_on, 
        'updated_on':self.updated_on
        }

    def __repr__(self):
        return '<id {}>'.format(self.id)

@login_manager.user_loader
def load_user(id):
    return Link.query.get(int(id))