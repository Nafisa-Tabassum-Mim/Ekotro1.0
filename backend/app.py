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
                "user_id": new_user["user_id"],
                "role": new_user["role"],  
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

        conn.commit()  
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
                "user_id": new_user["user_id"],
                "role": new_user["role"],  
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
                "user_id": existing_user["user_id"],
                "role": existing_user["role"],
                "name": existing_user["name"],
                "email": existing_user["email"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=4500),
            },
            app.config["SECRET_KEY"],  
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
        return f(login_user["user_id"], *args, **kwargs)

    return decorator


# student part


@app.route("/student_user", methods=["GET"])
@token_required
def get_student_user(user_id):
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        """
        SELECT u.user_id, u.name, u.email, u.fb_link, u.role, u.photo,s.front_side,s.back_side,s.uni_name, s.dept FROM user u
        JOIN student s ON u.user_id = s.s_id
        WHERE u.user_id = %s
    """,
        (user_id,),
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


# check sa


@app.route("/checksa/<int:sa_id>", methods=["GET"])
def check_sa(sa_id):
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT sa_id FROM student_ambassador WHERE sa_id = %s LIMIT 1", (sa_id,)
        )
        result = cursor.fetchone()
        cursor.close()

        if result:
            return jsonify({"exists": True})
        else:
            return jsonify({"exists": False})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/applyAmbassador/<int:user_id>", methods=["POST"])
def apply_for_sa(user_id):
    data = request.get_json()
    cursor = conn.cursor()

    try:
        # ✅ Update fb_link in user table
        cursor.execute(
            "UPDATE user SET fb_link = %s WHERE user_id = %s",
            (data.get("fb_link"), user_id),
        )

        # ✅ Insert into student_ambassador table
        cursor.execute(
            """
            INSERT INTO student_ambassador (sa_id, uni_name, dept, club_name, club_position, uni_weblink)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (
                user_id,
                data.get("uni_name"),
                data.get("dept"),
                # data.get("front_part"),
                # data.get("back_part"),
                data.get("club_name"),
                data.get("club_position"),
                data.get("uni_weblink"),
            ),
        )

        conn.commit()
        return jsonify({"message": "Applied for Ambassador successfully!"}), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()


# company part

@app.route("/company_user", methods=["GET"])
@token_required
def get_user(email):
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        """
        SELECT u.user_id, u.name, u.email, u.fb_link, u.role, u.photo, c.web_link FROM user u
        JOIN company c ON u.user_id = c.c_id
        WHERE u.email = %s
    """,
        (email,),
    )

    user_company = cursor.fetchone()
    cursor.close()

    if not user_company:
        return jsonify({"error": "User/Company not found"}), 404
    return jsonify(user_company)


@app.route("/updateCompany/<int:id>", methods=["PATCH"])
def update_company(id):
    data = request.get_json()
    fb_link = data.get("fb_link")

    cursor = conn.cursor()
    cursor.execute("UPDATE user SET fb_link = %s WHERE user_id = %s", (fb_link, id))
    conn.commit()
    cursor.close()

    return jsonify({"message": "Company info updated successfully"}), 200


# event part 

@app.route("/event", methods=["GET"])
def events():
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            e.event_id,
            e.name,
            e.uni_name,
            e.location,
            e.deadline,
            e.prize_money,
            GROUP_CONCAT(ec.category) AS categories
        FROM Event e
        LEFT JOIN event_category ec ON e.event_id = ec.e_id
        GROUP BY e.event_id
    """)
    events = cursor.fetchall()  
    cursor.close()
    return jsonify(events)  

@app.route("/event/<int:event_id>", methods=["GET"])
def event_detail(event_id):
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM event WHERE event_id = %s", (event_id,))
    event = cursor.fetchone()  
    cursor.close()
    return jsonify(event)

# event wishlist 
@app.route("/wishlist", methods=["POST"])
def add_to_wishlist():
    data = request.get_json()
    user_id = data.get("user_id")
    event_id = data.get("eventId") 
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO stu_in_event (ss_userID, event_id) VALUES (%s, %s)",
            (user_id, event_id),
        )
        conn.commit()
        return jsonify({"message": "Added to wishlist"}), 201
    except  mysql.connector.IntegrityError:
        return jsonify({"message": "Already in wishlist"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()


@app.route('/myWishlist', methods=['GET'])
@token_required
def get_wishlist(user_id):
    cursor = conn.cursor(dictionary=True)  
    query = """
        SELECT e.event_id, e.name, e.uni_name
        FROM Event e 
        JOIN stu_in_event s ON s.event_id = e.event_id
        WHERE s.ss_userID = %s
    """
    cursor.execute(query, (user_id,))
    events = cursor.fetchall()
    cursor.close()
    return jsonify(events)

# delete wishlist 

@app.route('/wishlist/<int:event_id>', methods=['DELETE'])
@token_required
def delete_wishlist_item(user_id, event_id):
    try:
        cursor = conn.cursor() 
        cursor.execute(
            "DELETE FROM stu_in_event WHERE ss_userID = %s AND event_id = %s",
            (user_id, event_id)
        )
        conn.commit()
        cursor.close()
        return jsonify({"message": "Event removed from wishlist successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# add event 

@app.route('/create_event', methods=['POST'])
@token_required
def create_event(user_id):
    data = request.get_json()

    name = data.get("name")
    description = data.get("description")
    weblink = data.get("weblink")
    fb_link = data.get("fb_link")
    deadline = data.get("deadline")
    prize_money = data.get("prize_money")
    uni_name = data.get("uni_name")
    location = data.get("location")

    try:
        cursor = conn.cursor()
        query = """
            INSERT INTO Event 
            (name, description, weblink, fb_link, deadline, prize_money, uni_name, location, asa_userID)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""" 
        values = (
            name, description, weblink, fb_link, deadline,
            prize_money, uni_name, location, user_id)

        cursor.execute(query, values)
        conn.commit()
        cursor.close()

        return jsonify({"message": "Event created successfully!"}), 201

    except Exception as e:
        print("Error inserting event:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/event/<int:event_id>", methods=["DELETE"])
def delete_event( event_id):
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Event WHERE event_id = %s", (event_id,))
        conn.commit()
        cursor.close()

        return jsonify({"message": "Event removed successfully!"}), 200
    
    except Exception as e:
        print("Error deleting event:", str(e))
        return jsonify({"error": str(e)}), 500
    
# funding 
@app.route("/apply_funding/<int:event_id>", methods=["POST"])
@token_required
def apply_funding(user_id,event_id):
    data = request.get_json()
    type_ = data.get("type")
    amount = data.get("amount")

    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO funding (type, amount, event_id, asa_userid)
            VALUES (%s, %s, %s, %s)
            """,
            (type_, amount, event_id, user_id)
        )
        conn.commit()
        cursor.close()
        return jsonify({"message": "Funding applied successfully!"}), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/funding_requests", methods=["GET"])
def funding_requests():
    cursor = conn.cursor(dictionary=True)
    query = """
        SELECT f.fund_id, f.type, f.amount, f.event_id, e.name AS event_name, e.uni_name
        FROM Funding f
        JOIN Event e ON f.event_id = e.event_id
    """
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

# student_ambassador 

@app.route("/get_sas", methods=["GET"])
def get_sas():
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT s.*, u.name, u.email,u.fb_link,u.role FROM student_ambassador s JOIN user u ON s.sa_id = u.user_id")
    sas = cursor.fetchall()
    cursor.close()
    return jsonify(sas)


@app.route("/approve_sa/<int:user_id>", methods=["POST"])
def approve_sa(user_id):
    try:
        cursor = conn.cursor()
        # Update role in user table
        cursor.execute("UPDATE user SET role='student_ambassador' WHERE user_id=%s", (user_id,))
        conn.commit()
        cursor.close()
        return jsonify({"message": "Student Ambassador approved successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/delete_sa/<int:sa_id>", methods=["DELETE"])
def delete_sa(sa_id):
    try:
        cursor = conn.cursor()
        # Delete from student_ambassador table
        cursor.execute("DELETE FROM student_ambassador WHERE sa_id=%s", (sa_id,))
        # Change role back to student
        cursor.execute("UPDATE user SET role='student' WHERE user_id=%s", (sa_id,))
        conn.commit()
        cursor.close()
        return jsonify({"message": "Student Ambassador deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
