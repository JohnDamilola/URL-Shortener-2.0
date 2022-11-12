from flask import Blueprint, jsonify               #import dependancies
from flask import current_app as app
from flask_login import login_required, login_user, logout_user
from flask_cors import cross_origin
from flask import request
from ..models.user import User, db
from ..extensions import bcrypt


auth_bp = Blueprint(
    'auth_bp', __name__
)

@auth_bp.route('/auth/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def register():                                       #this method is used to create new users and register them in firebase
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
def login():                                        #this method is used by registered users to sign in to their account
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']
        
        user = User.query.filter_by(email=email).first()
        if user:
            if bcrypt.check_password_hash(user.password_hash, password):
                login_user(user)
                return jsonify(
                    user = user.to_json(),
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
            message = f"An error occurred {e}",
            # message = 'An error occurred, please try again',               #if login is not successful, this message is displayed
            status = 500
        ), 500

@auth_bp.route('/auth/logout')
@login_required
@cross_origin(supports_credentials=True)
def logout():
    logout_user()
    
    
if __name__ == '__main__':
    app.debug = True
    app.run()
