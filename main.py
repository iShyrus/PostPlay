from flask import Flask, redirect, url_for, request, render_template, session, flash
import json
from flask_sqlalchemy import SQLAlchemy
import os
from flask_admin import Admin


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
admin = Admin(app)
db = SQLAlchemy(app)

class userInformation(db.Model):
    username = db.Column("username", db.String ,primary_key=True)
    password = db.Column("password", db.String)
    status = db.Column("status", db.String)

    def __init__(self, username, password, status):
        self.username = username
        self.password = password
        self.status = status

class userPosting(db.Model):
    pathToPost = db.Column("pathToPost", db.String ,primary_key=True)
    description = db.Column("description", db.String)
    username = db.Column("username", db.String)
    likes = db.Column("likes", db.String)
    comments = db.Column("comments", db.String)

    def __init__(self, pathToPost, description, username, likes, comments):
        self.pathToPost = pathToPost
        self.description = description
        self.username = username
        self.likes = likes
        self.comments = comments



@app.route("/", methods = ['POST',"GET"])
def index():
    if request.method == "POST":
        usernameLogin = request.form["inputUsername"]
        usernamePassword = request.form["inputPassword"]
        newUsernameLogin = request.form["inputNewUsername"]
        newUsernamePassword = request.form["inputNewPassword"]
        found_user = userInformation.query.filter_by(username=usernameLogin).first()
        
        if usernameLogin != "" and found_user.password == usernamePassword:
            return redirect(url_for('dashboard', username=request.form["inputUsername"]))
        elif newUsernameLogin!= "":
            usr = userInformation(newUsernameLogin,newUsernamePassword,"member")
            db.session.add(usr)
            db.session.commit()
            return render_template("loginScreen.html")
        
    return render_template("loginScreen.html")

@app.route("/dashboard/<username>", methods = ['POST',"GET"])
def dashboard(username):
    if request.method =="POST":
        descriptionText = request.form['descriptionText']
        file = request.files['image']
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
        pathToPost = "static/images/"+file.filename
        postSubmit = userPosting(pathToPost,descriptionText,username,"0","")
        db.session.add(postSubmit)
        db.session.commit()

    allPathToPostArr = [user.pathToPost for user in userPosting.query.all()]
    allDescriptionArr = [user.description for user in userPosting.query.all()]
    allUsernameArr = [user.username for user in userPosting.query.all()]
    allLikesArr = [user.likes for user in userPosting.query.all()]
    allCommentsArr = [user.comments for user in userPosting.query.all()]

    return render_template("dashboard.html", username = username, allPaths = allPathToPostArr, allDescriptions = allDescriptionArr, allUsernames = allUsernameArr, allLikes = allLikesArr, allComments = allCommentsArr)

with app.app_context():
    db.create_all()
if __name__ == '__main__':
    app.config['UPLOAD_FOLDER'] = 'static/images'
    app.secret_key = 'secretKeyS'
    app.run(debug=True)

