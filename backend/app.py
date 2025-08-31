from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

# Code to import JWT and password hashing.
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import jwt
import datetime
from functools import wraps

# Code to import JWT and password hashing.


app = Flask(__name__)
app.config["SECRET_KEY"] = "my_very_secret_key_123"
CORS(app)

# Connect to MySQL database
conn = mysql.connector.connect(
    host="localhost", user="root", password="", database="nextbell"
)


# Code for jwt, login and register
@app.route("/register", methods=["POST"])
def register_user():
    try:
        data = request.get_json()
        name = data["name"]
        email = data["email"]
        password = data["password"]

        hash_pass = generate_password_hash(password, method="pbkdf2:sha256")

        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO user (name, email, password, public_id)   VALUES (%s, %s, %s, %s)",
            (name, email, hash_pass, str(uuid.uuid4())),
        )
        user_id = cursor.lastrowid
        print()
        # Insert into student table (user_id as FK)
        cursor.execute("INSERT INTO student (s_id) VALUES (%s)", (user_id,))
        conn.commit()  # Save changes
        cursor.close()

        # Fetch the newly created user
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM user WHERE email = %s LIMIT 1", (email,))
        new_user = cursor.fetchone()
        cursor.close()

        # Create JWT token
        token = jwt.encode(
            {
                "public_id": new_user["public_id"],
                "role": new_user["role"],  # default role
                "name": new_user["name"],
                "email": new_user["email"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=4500),
            },
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )

        return jsonify({"token": token}), 201

    except mysql.connector.IntegrityError as e:
        # 1062 = duplicate entry error in MySQL
        if e.errno == 1062:
            return jsonify({"error": "Email already registered"}), 409
        return jsonify({"error": ""}), 400


@app.route("/company_register", methods=["POST"])
def register_company():
    try:
        data = request.get_json()
        name = data["name"]
        email = data["email"]
        password = data["password"]
        web_link = data["web_link"]

        hash_pass = generate_password_hash(password, method="pbkdf2:sha256")

        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO user (name, email, password,role, public_id)   VALUES (%s, %s, %s,%s, %s)",
            (name, email, hash_pass, "company", str(uuid.uuid4())),
        )
        user_id = cursor.lastrowid
        print()
        # Insert into company table (c_id as FK)
        cursor.execute(
            "INSERT INTO company (c_id, web_link) VALUES (%s, %s)", (user_id, web_link)
        )

        conn.commit()  # Save changes
        cursor.close()

        # Fetch the newly created user
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM user WHERE email = %s LIMIT 1", (email,))
        new_user = cursor.fetchone()
        cursor.close()

        # Create JWT token
        token = jwt.encode(
            {
                "public_id": new_user["public_id"],
                "role": new_user["role"],  # default role
                "name": new_user["name"],
                "email": new_user["email"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=4500),
            },
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )

        return jsonify({"token": token}), 201

    except mysql.connector.IntegrityError as e:
        # 1062 = duplicate entry error in MySQL
        if e.errno == 1062:
            return jsonify({"error": "Email already registered"}), 409
        return jsonify({"error": ""}), 400


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    # Validate input
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Find user
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user WHERE email = %s LIMIT 1", (email,))
    existing_user = cursor.fetchone()
    cursor.close()

    if not existing_user:
        return jsonify({"error": "No user found"}), 404

    # Check password
    if check_password_hash(existing_user["password"], password):
        print("pass is ok")
        token = jwt.encode(
            {
                "public_id": existing_user["public_id"],
                "role": existing_user["role"],
                "name": existing_user["name"],
                "email": existing_user["email"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=4500),
            },
            app.config["SECRET_KEY"],  # define this in your config
            algorithm="HS256",
        )
        return jsonify({"token": token}), 200

    return jsonify({"error": "Incorrect password"}), 401


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if "token" in request.headers:
            token = request.headers["token"]
        if not token:
            return jsonify({"error": "token is required"})
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            # print(data)
            # Find user
            cursor = conn.cursor(dictionary=True)
            cursor.execute(
                "SELECT * FROM user WHERE public_id = %s LIMIT 1", (data["public_id"],)
            )
            login_user = cursor.fetchone()
            # print(login_user)
            cursor.close()

            if not login_user:
                return jsonify({"error": "No user found"}), 404

        except Exception as e:
            return jsonify({"error": str(e)})
        return f(login_user["email"], *args, **kwargs)

    return decorator


# @app.route("/", methods=["GET"])
# @token_required
# def home(login_user):
#     print("login user email", login_user)
#     return jsonify({"message": "Hello world"})


# Code for jwt login and register

# @app.route("/user", methods=["GET"])
# @token_required
# def get_user(email):
#     cursor = conn.cursor(dictionary=True)
#     cursor.execute(
#         "SELECT name, email, fb_link, role, photo FROM user WHERE email = %s",
#         (email,)
#     )
#     user = cursor.fetchone()
#     cursor.close()

#     if not user:
#         return jsonify({"error": "User not found"}), 404
#     return jsonify(user)


# student part


@app.route("/user", methods=["GET"])
@token_required
def get_user(email):
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        """
        SELECT u.user_id, u.name, u.email, u.fb_link, u.role, u.photo,s.front_side,s.back_side,s.uni_name, s.dept FROM user u
        JOIN student s ON u.user_id = s.s_id
        WHERE u.email = %s
    """,
        (email,),
    )

    user_student = cursor.fetchone()
    cursor.close()

    if not user_student:
        return jsonify({"error": "User/Student not found"}), 404
    return jsonify(user_student)


@app.route("/updateStudent/<int:user_id>", methods=["PATCH"])
def update_student(user_id):
    data = request.get_json()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE user SET fb_link=%s WHERE user_id=%s", (data.get("fb_link"), user_id)
    )
    cursor.execute(
        "UPDATE student SET uni_name=%s, dept=%s, front_side=%s, back_side=%s WHERE s_id=%s",
        (
            data.get("uni_name"),
            data.get("dept"),
            data.get("front_side"),
            data.get("back_side"),
            user_id,
        ),
    )
    conn.commit()
    cursor.close()
    return jsonify({"message": "User updated successfully!"})


# @app.route("/customers", methods=["GET"])
# def get_customers():
#     cursor = conn.cursor(
#         dictionary=True
#     )  # dictionary=True → returns dict instead of tuple
#     cursor.execute("SELECT * FROM customer")
#     customers = cursor.fetchall()
#     cursor.close()
#     return jsonify(customers)


# @app.route("/customers", methods=["POST"])
# def add_customer():
#     data = request.get_json()
#     customer_city = data.get("customer_city")
#     customer_name = data.get("customer_name")
#     customer_street = data.get("customer_street")
#     customer_id = data.get("customer_id")

#     cursor = conn.cursor()
#     cursor.execute(
#         "INSERT INTO customer (customer_city, customer_name,customer_street,customer_id ) VALUES (%s, %s,%s,%s)",
#         (customer_city, customer_name, customer_street, customer_id),
#     )
#     conn.commit()  # Save changes
#     cursor.close()

#     return jsonify({"message": "Customer added successfully!"}), 201


# @app.route("/customers/<string:id>", methods=["DELETE"])
# def delete_customer(id):
#     cursor = conn.cursor()
#     cursor.execute("delete from customer WHERE customer_id=%s", (id,))

#     conn.commit()
#     cursor.close()
#     return jsonify({"message": f"deleted {id}"})


# @app.route("/customer/<int:id>", methods=["PATCH"])
# def update_customer(id):
#     data = request.get_json()
#     cursor = conn.cursor()

#     cursor.execute(
#         "INSERT INTO customer set customer_city=%s, customer_name=%s,customer_street=%s WHERE customer_id=%s",
#         data["customer_city"],
#         data["customer_name"],
#         data["customer_street"],
#     )

#     conn.commit()  # Save changes
#     cursor.close()
#     return jsonify({"message": "updated"})


# def role_required(required_role):
#     def wrapper(fn):
#         @wraps(fn)
#         def decorated(*args, **kwargs):
#             token = request.headers.get("Authorization").split(" ")[1]
#             try:
#                 data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
#                 if data["role"] != required_role:
#                     return jsonify({"error": "Access denied"}), 403
#             except:
#                 return jsonify({"error": "Invalid token"}), 401
#             return fn(*args, **kwargs)
#         return decorated
#     return wrapper

# @app.route("/admin-only")
# @role_required("admin")
# def admin_panel():
#     return jsonify({"message": "Welcome Admin!"})


if __name__ == "__main__":
    app.run(debug=True)
