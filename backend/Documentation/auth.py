#
#MIT License
#
#Copyright (c) 2022 John Damilola, Leo Hsiang, Swarangi Gaurkar, Kritika Javali, Aaron Dias Barreto
#
#Permission is hereby granted, free of charge, to any person obtaining a copy
#of this software and associated documentation files (the "Software"), to deal
#in the Software without restriction, including without limitation the rights
#to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#copies of the Software, and to permit persons to whom the Software is
#furnished to do so, subject to the following conditions:
#
#The above copyright notice and this permission notice shall be included in all
#copies or substantial portions of the Software.
#
#THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
#SOFTWARE.


import datetime
from flask import Blueprint, jsonify               #import dependancies
from flask import current_app as app
from flask_login import login_required, login_user, logout_user
from flask_cors import cross_origin
from flask import request
try:
    from ..models.user import User, db, load_user
    from ..extensions import bcrypt
except ImportError:
    from user import User, db, load_user
    from extensions import bcrypt
import jwt

auth_bp = Blueprint(
    'auth_bp', __name__
)

@auth_bp.route('/auth/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def register():
    """This method is used to create new users and register them"""
    try:
        data = request.get_json()
        email = data['email']
        first_name = data['first_name']
        last_name = data['last_name']
        password = data['password']
        
        
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, first_name=first_name, last_name=last_name, password_hash=password_hash)
        db.session.add(new_user)
        db.session.commit()
    
        return jsonify(
            user = new_user.to_json(),                            
            message = 'Registered Successfully',    #if the registration process is successful, this message is displayed
            status = 201
        ), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(
            message = f'Registration Failed {e}',        #if the registration process is not successful, this message is displayed
            status = 400
        ), 400

@auth_bp.route('/auth/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    """This method is used by registered users to sign in to their account"""
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']
        
        user = User.query.filter_by(email=email).first()
        
        if user:
            if bcrypt.check_password_hash(user.password_hash, password):
                token = jwt.encode({'public_id': str(user.id), 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=12)}, app.config['SECRET_KEY'])
                login_user(user)
                return jsonify(
                    user = user.to_json(),
                    token = token,
                    message = 'Login Successful',           #if login is successful, this message is displayed
                    status = 200
                ), 200
            else:
                return jsonify(
                    message = 'Invalid Password',           #if login is successful, this message is displayed
                    status = 400
                ), 400
        else:
            return jsonify(
                message = 'User with this account not found',           #if login is successful, this message is displayed
                status = 400
            ), 400
    except Exception as e:
        return jsonify(
            message = f"An error occurred {e}",                     #if login is not successful, this message is displayed
            status = 500
        ), 500
    
@auth_bp.route('/user/update/<id>', methods=['PATCH'])
@cross_origin(supports_credentials=True)   
def update(id):
    '''This method is called when the user requests to update the their credentials.'''
    try:
        data = request.get_json()
        first_name = data['first_name']
        last_name = data['last_name']
        email = data['email']
        
        user = load_user(id)
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        db.session.commit()

        return jsonify(
            user = user.to_json(),
            message = 'Update User Successful',
            status = 201
        ), 201
    except Exception as e:
        return jsonify(
            message = f'Update User Failed {e}',
            status = 400
        ), 400

@auth_bp.route('/user/delete/<id>', methods = ['DELETE'])
@cross_origin(supports_credentials=True)
def delete(id):
    '''This method is called when the user requests to delete the their account. Only the user id is required to delete the account.'''
    try:
        db.session.query(User).filter_by(id=id).delete()
        db.session.commit()
        return jsonify(
            message = 'Delete User Successful',
            status = 200
        ), 200
    except Exception as e:
        return jsonify(
            message = f'Delete User Failed {e}',
            status = 400
        ), 400    
   
@auth_bp.route('/auth/logout')
@login_required
@cross_origin(supports_credentials=True)
def logout():
    """This method is used when the user wants to logout of their account"""
    try:
        logout_user()
        return jsonify(
            message = 'Logout Successful',
            status = 200
        ), 200
    except Exception as e:
        return jsonify(
            message = f'Logout Failed {e}',
            status = 400
        ), 400    
