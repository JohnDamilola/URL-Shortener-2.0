import uuid
try:
	from ..extensions import db
except ImportError:
	from extensions import db
from sqlalchemy.dialects.postgresql import UUID

class Link(db.Model):
    __tablename__ = 'links'
 
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    stub = db.Column(db.String(100), unique=True, nullable=False)
    long_url = db.Column(db.String(2083), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    disabled = db.Column(db.Boolean, default=False, nullable=False)
    utm_source = db.Column(db.String(100), nullable=True)
    utm_medium = db.Column(db.String(100), nullable=True)
    utm_campaign = db.Column(db.String(100), nullable=True)
    utm_term = db.Column(db.String(100), nullable=True)
    utm_content = db.Column(db.String(100), nullable=True)
    password_hash = db.Column(db.String(), nullable=True)
    expire_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=True)
    created_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    updated_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False, server_onupdate=db.func.now())
	# make a relationship with 'User' model
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'))

    def __init__(self, id, user_id, stub, long_url, title, disabled, utm_source, utm_medium, utm_campaign, utm_term, utm_content, password_hash, expire_on):
        self.id=id
        self.user_id=user_id
        self.stub=stub
        self.long_url = long_url
        self.title = title
        self.disabled=disabled
        self.utm_source=utm_source
        self.utm_medium=utm_medium
        self.utm_campaign=utm_campaign
        self.utm_term=utm_term
        self.utm_content=utm_content
        self.password_hash = password_hash
        self.expire_on=expire_on

    def to_json(self):
        return {
        'id': self.id,
        'user_id':self.user_id,
        'stub':self.stub,
        'long_url' : self.long_url,
        'title':self.title,
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

def load_link(id):
    return Link.query.get(id)
