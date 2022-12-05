import uuid
try:
	from ..extensions import db
except ImportError:
	from extensions import db
from sqlalchemy.dialects.postgresql import UUID

class Engagements(db.Model):
    __tablename__ = 'engagements'
 
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
		
    utm_source = db.Column(db.String(100), nullable=True)
    utm_medium = db.Column(db.String(100), nullable=True)
    utm_campaign = db.Column(db.String(100), nullable=True)
    utm_term = db.Column(db.String(100), nullable=True)
    utm_content = db.Column(db.String(100), nullable=True)

    created_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    updated_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False, server_onupdate=db.func.now())
    # make a relationship with 'Link' model
    link_id = db.Column(UUID(as_uuid=True), db.ForeignKey('links.id'))

    def to_json(self):
        return {
        'id': self.id,
        'link_id':self.link_id,
        'utm_source':self.utm_source,
        'utm_medium':self.utm_medium,
        'utm_campaign':self.utm_campaign,
        'utm_term':self.utm_term,
        'utm_content':self.utm_content,
        'created_on':self.created_on, 
        'updated_on':self.updated_on
        }

    def __repr__(self):
        return '<id {}>'.format(self.id)

def load_engagements(id):
    return Engagements.query.get(id)
