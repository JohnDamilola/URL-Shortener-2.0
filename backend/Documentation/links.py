from flask import Blueprint, jsonify               #import dependancies
from flask import current_app as app
from flask_cors import cross_origin
from flask import request
try:
    from ..models.links import Link, db, load_link
except ImportError:
    from link import Link, db, load_link

links_bp = Blueprint(
    'links_bp', __name__
)

@links_bp.route('/link/<id>', methods = ['GET'])
@cross_origin(supports_credentials=True)
def getlink(id):
    '''This method is called when we want to fetch a single link, we pass user_id'''
    try:
        single_link = Link.query.get(id)
        return jsonify(
            single_link = single_link.stub,
            message = 'Fetched link successfully',
            status = 200
        ), 200
    except Exception as e:
        return jsonify(
            decks = [],
            message = f"An error occurred: {e}",
            status = 400
        ), 400

@links_bp.route('/links/all', methods = ['GET'])
@cross_origin(supports_credentials=True)
def getalllinks():
    '''This method is called when we want to fetch all of the links of a particular user. Here, we check if the user is authenticated, 
    if yes show all the decks made by the user.'''
    args = request.args
    localId = args and args['localId']
    try:
        if localId:
            all_links = db.session.query(Link).filter_by(user_id=localId).all()
            links=[]
            for link in all_links:
                links.append(link.stub)
            #for l in all_links.each():
                #obj = l.val()
                #obj['id'] = l.key()
                #links.append(obj)
                
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
    # url_shortener = Shortener('Bitly', bitly_token = 'ACCESS_TOKEN') 
    # return "url_shortener.short(long_url)"
    return "url_shortener"+long_url[-5:]


@links_bp.route('/link/create', methods = ['POST'])
@cross_origin(supports_credentials=True)
def create():
    '''This method is routed when the user requests to create a new link.'''
    try:
        data = request.get_json()
        id =data['id']
        localId = data['user_id']
        long_url=data['long_url']
        stub=create_shortlink(long_url)
        title=data['title'] 
        disabled=data['disabled']
        utm_source=data['utm_source']
        utm_medium=data['utm_medium']
        utm_campaign=data['utm_campaign']
        utm_term=data['utm_term']
        utm_content=data['utm_content']
        password_hash=data['password_hash'] 
        expire_on=data['expire_on']

        new_link = Link(id=id, user_id=localId, stub=stub, long_url=long_url, title=title, disabled=disabled, utm_source=utm_source, utm_medium=utm_medium,utm_campaign=utm_campaign, utm_term=utm_term, utm_content=utm_content, password_hash=password_hash, expire_on=expire_on)
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

@links_bp.route('/link/update/<id>', methods = ['PATCH'])
@cross_origin(supports_credentials=True)
def update(id):
    '''This method is called when the user requests to update the link.'''
    try:
        data = request.get_json()
        id =data['id']
        localId = data['user_id']
        stub=data['stub']
        long_url=data['long_url']
        title=data['title']
        disabled=data['disabled']
        utm_source=data['utm_source'] 
        utm_medium=data['utm_medium'] 
        utm_campaign=data['utm_campaign'] 
        utm_content=data['utm_content'] 
        utm_term=data['utm_term'] 
        password_hash=data['password_hash'] 
        expire_on=data['expire_on'] 

        link = load_link(id)
        link.user_id=localId
        link.stub=stub
        link.long_url=long_url
        link.title=title
        link.disabled=disabled
        link.utm_source=utm_source 
        link.utm_medium=utm_medium 
        link.utm_campaign=utm_campaign 
        link.utm_content=utm_content 
        link.utm_term=utm_term 
        link.password_hash=password_hash 
        link.expire_on=expire_on 
        #db.session.query(Link).filter_by(id=id).update(id=id, user_id=localId, stub=stub,long_url=long_url, title=title, disabled=disabled, utm_source=utm_source, utm_medium=utm_medium, utm_campaign=utm_campaign, utm_content=utm_content, utm_term=utm_term, password_hash=password_hash, expire_on=expire_on)
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

@links_bp.route('/link/delete/<id>', methods = ['DELETE'])
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
    
    

@links_bp.route('/links/count', methods = ['GET'])
@cross_origin(supports_credentials=True)
def count():
    '''This method is called when we want to fetch count of all created links of a particular user. Here, we check if the user is authenticated, 
    if yes show all the decks made by the user.'''

@links_bp.route('/links/engagements', methods = ['GET'])
@cross_origin(supports_credentials=True)
def getlinksengagement():
    '''This method is called when we want to fetch the analytics of the links'''
    args = request.args
    localId = args and args['localId']
    try:
        if localId:
            all_links = db.session.query(Link).filter_by(user_id=localId).all()
            links=[]
            for link in all_links:
                links.append(link.stub)
            
            counts=len(links)
            #for l in all_links.each():
                #obj = l.val()
                #obj['id'] = l.key()
                #links.append(obj)
                
            #return jsonify(
                #counts = counts,
                #message = 'Number of links of user fetched successfully'
            links = []
            for link in all_links:
                links.append(link.stub)
                links.append(link.utm_source)
                links.append(link.utm_medium) 
                links.append(link.utm_campaign)
                links.append(link.utm_term)
                links.append(link.utm_content)
                links.append(link.created_on)
                
            return jsonify(
                links = links,
                message = 'Fetching Analytics data successfully',
                status = 200
            ), 200
        else:
             return jsonify(
                links = "",
                message = 'Please login to see analytics data',
                status = 200
            ), 200
    except Exception as e:
        return jsonify(
            links = [],
            message = f"An error occurred {e}",
            status = 400
        ), 400


@links_bp.route('/links/enabled', methods = ['GET'])
@cross_origin(supports_credentials=True)
def enabled():
    '''This method is called when we want to fetch count of all enabled links of a particular user . Here, we check if the user is authenticated, 
    if yes show all the decks made by the user.'''
    args = request.args
    localId = args and args['localId']
    try:
        if localId:
            all_links = db.session.query(Link).filter_by(user_id=localId, disabled=False).all()
            links=[]
            for link in all_links:
                links.append(link.stub)
            
            counts=len(links)
            #for l in all_links.each():
                #obj = l.val()
                #obj['id'] = l.key()
                #links.append(obj)
                
            return jsonify(
                counts = counts,
                message = 'Number of enabled links of user fetched successfully',
                status = 200
            ), 200
        else:
             return jsonify(
                links = "",
                message = 'Please login to see all links',
                status = 400
        ), 400
    except Exception as e:
        return jsonify(
            links = [],
            message = f"An error occurred {e}",
            status = 400
        ), 400


@links_bp.route('/links/engagements/<id>', methods = ['GET'])
@cross_origin(supports_credentials=True)
def getsinglelinkengagements():
    '''This method is routed when the user requests analytics for a single link.'''
    try:
        data = request.get_json()
        stub =data['id']

        Analytics_data = db.session.query(Link).filter_by(stub=stub).all()
        ana_data=[]
        for ad in Analytics_data:
                ana_data.append(ad.stub)
                ana_data.append(ad.utm_source)
                ana_data.append(ad.utm_medium) 
                ana_data.append(ad.utm_campaign)
                ana_data.append(ad.utm_term)
                ana_data.append(ad.utm_content)
                ana_data.append(ad.created_on)
        

        return jsonify(
           ad=ana_data,
                message = 'Fetching Analytics data successfully',
                status = 200
            ), 200
    except Exception as e:
        return jsonify(
            links = [],
            message = f'Fetching Analytics failed {e}',
            status = 400
        ), 400
