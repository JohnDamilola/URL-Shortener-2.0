import uuid
try:
	from ..extensions import db
except ImportError:
	from extensions import db
from sqlalchemy.dialects.postgresql import UUID

class AnonymousLink(db.Model):
    __tablename__ = 'anonymous_links'
 
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    stub = db.Column(db.String(100), unique=True, nullable=False)
    long_url = db.Column(db.String(2083), nullable=False)
    created_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    updated_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False, server_onupdate=db.func.now())

    def to_json(self):
        return {
        'id': self.id,
        'stub':self.stub,
        'long_url' : self.long_url,
        'created_on':self.created_on, 
        'updated_on':self.updated_on
    }

def load_link(id):
    return AnonymousLink.query.get(id)
