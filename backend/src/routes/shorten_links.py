import datetime
from flask import Blueprint, jsonify               #import dependancies
from flask import current_app as app
from flask_login import login_required, login_user, logout_user
from flask_cors import cross_origin
from flask import request
try:
    from ..models.user import User, db
    from ..models.links import Link, db
    from ..extensions import bcrypt
except ImportError:
    from models.user import User, db
    from models.links import Link, db
    from extensions import bcrypt
import jwt
from pyshorteners import Shortener 

shorten_links_bp = Blueprint(
    'shorten_links_bp', __name__
)

@shorten_links_bp.route('/link/<id>', methods = ['GET'])
@cross_origin(supports_credentials=True)
def getlink(id):
    '''This method is called when we want to fetch a single link, we pass user_id'''
    try:
        single_link = Link.query.get(id)
        return jsonify(
            single_link = single_link.val(),
            message = 'Fetched link successfully',
            status = 200
        ), 200
    except Exception as e:
        print(e)
        return jsonify(
            decks = [],
            message = f"An error occurred: {e}",
            status = 400
        ), 400

@shorten_links_bp.route('/links/all', methods = ['GET'])
@cross_origin(supports_credentials=True)
def getalllinks():
    '''This method is called when we want to fetch all of the links of a particular user. Here, we check if the user is authenticated, 
    if yes show all the decks made by the user.'''
    args = request.args
    localId = args and args['localId']
    try:
        if localId:
            all_links = db.session.query(Link).filter_by(user_id=localId).all()
            links = []
            for l in all_links.each():
                obj = l.val()
                obj['id'] = l.key()
                links.append(obj)
                
            return jsonify(
                links = links,
                message = 'Fetching links successfully',
                status = 200
            ), 200
        else:
             return jsonify(
                links = "",
                message = 'Please login to see all links',
                status = 200
            ), 200
    except Exception as e:
        return jsonify(
            decks = [],
            message = f"An error occurred {e}",
            status = 400
        ), 400

def create_shortlink(long_url):
    url_shortener = Shortener('Bitly', bitly_token = 'ACCESS_TOKEN') 
    return url_shortener.short(long_url)


@shorten_links_bp.route('/link/create', methods = ['POST'])
@cross_origin(supports_credentials=True)
def create():
    '''This method is routed when the user requests to create a new link.'''
    try:
        data = request.get_json()
        id =data['id']
        localId = data['user_id']
        long_url=data['long_url'] 
        stub=create_shortlink(long_url)
        disabled=data['disabled']
        utm_source=data['utm_source'] 
        utm_medium=data['utm_medium'] 
        utm_campaign=data['utm_campaign'] 
        utm_term=data['utm_term'] 
        utm_content=data['utm_content'] 
        utm_term=data['utm_term'] 
        password_hash=data['password_hash'] 
        expire_on=data['expire_on'] 

        new_link = Link(id=id, user_id=localId, stub=stub,long_url=long_url,disabled=disabled,utm_source=utm_source, utm_medium=utm_medium,utm_campaign=utm_campaign, utm_term=utm_term, utm_content=utm_content,expire_on=expire_on)
        db.session.add(new_link)
        db.session.commit()

        return jsonify(
            message = 'Create Link Successful',
            status = 201
        ), 201
    except Exception as e:
        return jsonify(
            message = f'Create Link Failed {e}',
            status = 400
        ), 400

@shorten_links_bp.route('/link/update/<id>', methods = ['PATCH'])
@cross_origin(supports_credentials=True)
def update(id):
    '''This method is called when the user requests to update the link.'''
    try:
        data = request.get_json()
        id =data['id']
        localId = data['user_id']
        stub=data['stub']
        long_url=data['long_url'] 
        disabled=data['disabled']
        utm_source=data['utm_source'] 
        utm_medium=data['utm_medium'] 
        utm_campaign=data['utm_campaign'] 
        utm_term=data['utm_term'] 
        utm_content=data['utm_content'] 
        utm_term=data['utm_term'] 
        password_hash=data['password_hash'] 
        expire_on=data['expire_on'] 

        db.session.query(Link).filter_by(id=id).update(id=id, user_id=localId, stub=stub,long_url=long_url,disabled=disabled,utm_source=utm_source, utm_medium=utm_medium,utm_campaign=utm_campaign, utm_term=utm_term, utm_content=utm_content, password_hash=password_hash,expire_on=expire_on)
        db.session.commit()

        return jsonify(
            message = 'Update Link Successful',
            status = 201
        ), 201
    except Exception as e:
        return jsonify(
            message = f'Update Link Failed {e}',
            status = 400
        ), 400

@shorten_links_bp.route('/link/delete/<id>', methods = ['DELETE'])
@cross_origin(supports_credentials=True)
def delete(id):
    '''This method is called when the user requests to delete the link. Only the link id is required to delete the deck.'''
    try:
        db.session.query(Link).filter_by(id=id).delete()
        db.session.commit()
        return jsonify(
            message = 'Delete link Successful',
            status = 200
        ), 200
    except Exception as e:
        return jsonify(
            message = f'Delete link Failed {e}',
            status = 400
        ), 400
