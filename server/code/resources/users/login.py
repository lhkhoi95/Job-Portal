from security import hash_password
from flask_restful import Resource, reqparse
from models.user_model import UserModel
from flask_jwt_extended import create_access_token
from flask_jwt_extended import set_access_cookies
from response_message_code import response_message_code


class Login(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("email",
                        type=str,
                        required=True,
                        help="Email cannot be left blank")

    parser.add_argument("password",
                        type=str,
                        required=True,
                        help="Password cannot be left blank")
    """
    Return a dictionary that contains user login information such as email, password, etc.
    Perform basic validation on email and password.
    Create access token that will be stored in web browser cookies.
    The front end (website) does not need to handle any logic.
    """
    @classmethod
    def post(cls):

        data = Login.parser.parse_args()

        user = UserModel.find_by_email(data['email'])
        if not user:
            response = response_message_code("Invalid Email", 403)
            return response
        elif user.password != hash_password(data['password']):
            response = response_message_code("Wrong password", 403)
            return response

        response = response_message_code("Login Successful", 200)
        # response.access_control_allow_credentials = True
        access_token = create_access_token(identity=data)
        set_access_cookies(response, access_token)

        return response
