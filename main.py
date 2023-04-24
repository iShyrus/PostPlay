from flask import Flask, redirect, url_for, request, render_template, session, flash
import json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"

db = SQLAlchemy(app)

class usernameInformation(db.Model):
    username = db.Column("username", db.String ,primary_key=True)
    password = db.Column("password", db.String)
    status = db.Column("status", db.String)

@app.route("/", methods = ['POST',"GET"])
def index():
    if request.method == "POST":
        usernameLogin = request.form["inputUsername"]
        usernamePassword = request.form["inputPassword"]
        newUsernameLogin = request.form["inputNewUsername"]
        newUsernamePassword = request.form["inputNewPassword"]

        if usernameLogin != "":
            return redirect(url_for('dashboard', username=request.form["inputUsername"]))
        
        elif newUsernameLogin!= "":
            return render_template("loginScreen.html")
        
    return render_template("loginScreen.html")

@app.route("/dashboard/<username>", methods = ['POST',"GET"])
def dashboard(username):
    print(username)
    return render_template("dashboard.html", username = username)

with app.app_context():
    db.create_all()
if __name__ == '__main__':
    app.secret_key = 'secretKeyS'
    app.run(debug=True)