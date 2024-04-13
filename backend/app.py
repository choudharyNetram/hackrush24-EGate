from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_mysqldb import MySQL
import config

from flask_cors import CORS
from functools import wraps
import re 
import jwt
import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = config.MYSQL_HOST
#app.config['MYSQL_USER'] = config.MYSQL_USER
#app.config['MYSQL_PASSWORD'] = config.MYSQL_PASSWORD
app.config['MYSQL_DB'] = config.MYSQL_DB
app.config['SECRET_KEY'] = config.SECRET_KEY
def set_mysql_credentials(user, password):
    app.config['MYSQL_USER'] = user
    app.config['MYSQL_PASSWORD'] = password
mysql = MySQL(app)


@app.route('/signup/Student', methods=['POST'])
def create_user():
    try:
        app.config['MYSQL_USER'] = config.MYSQL_USER
        app.config['MYSQL_PASSWORD'] = config.MYSQL_PASSWORD
        cur = mysql.connection.cursor()
        data = request.get_json()
        
        # Extract data from the request
        useremail = data['useremail']
        password = data['password']
        hostelName = data.get('hostelName')
        RoomNumber = data.get('RoomNumber')
        PhoneNumber = data.get('PhoneNumber')
        program = data.get('program')
        discipline = data.get('discipline')
        RollNumber = data.get('RollNumber')
        address = data.get('address')
        isOnCampus = data.get('isOnCampus')

        # Check if the email address matches the required format
        if not re.match(r'^[^\s@]+@iitgn\.ac\.in$', useremail):
            raise ValueError("Invalid email address format")

        # Insert user details into the Student table
        cur.execute("INSERT INTO Student (useremail, password, hostelName, RoomNumber, PhoneNumber, program, discipline, RollNumber, address, isOnCampus) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (useremail, password, hostelName, RoomNumber, PhoneNumber, program, discipline, RollNumber, address, isOnCampus))
        mysql.connection.commit()

        cur.close()

        return jsonify({"message": "User created successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Student login endpoint
@app.route('/login/Student', methods=['POST'])
def student_login():
    try:
        data = request.get_json()
        useremail = data.get('useremail')
        password = data.get('password')
        set_mysql_credentials(useremail, password)
        # Authenticate student
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Student WHERE useremail = %s AND password = %s", (useremail, password))
        student = cur.fetchone()
        cur.close()

        if student:
            # Generate JWT token
            access_token = create_access_token(identity=useremail)
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Student profile endpoint (protected by JWT)
@app.route('/profile/Student', methods=['GET'])
@jwt_required()
def get_student_profile():
    try:
        current_user = get_jwt_identity()

        # Retrieve student profile from database
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Student WHERE useremail = %s", (current_user,))
        student = cur.fetchone()
        cur.close()

        if student:
            return jsonify(student), 200
        else:
            return jsonify({"message": "Student not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)