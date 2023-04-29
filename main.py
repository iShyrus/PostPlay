from flask import Flask, redirect, url_for, request, render_template, session, flash
import json
from flask_sqlalchemy import SQLAlchemy
import os
from flask_admin import Admin
from datetime import date


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
admin = Admin(app)
db = SQLAlchemy(app)

class userInformations(db.Model):
    username = db.Column("username", db.String ,primary_key=True)
    password = db.Column("password", db.String)
    status = db.Column("status", db.String)
    likedPosts = db.Column("likedPosts", db.String)

    def __init__(self, username, password, status, likedPosts):
        self.username = username
        self.password = password
        self.status = status
        self.likedPosts = likedPosts

class userPostingInfo(db.Model):
    pathToPost = db.Column("pathToPost", db.String ,primary_key=True)
    description = db.Column("description", db.String)
    username = db.Column("username", db.String)
    likes = db.Column("likes", db.String)
    comments = db.Column("comments", db.String)
    datePosted = db.Column("datePosted", db.String)

    def __init__(self, pathToPost, description, username, likes, comments,datePosted):
        self.pathToPost = pathToPost
        self.description = description
        self.username = username
        self.likes = likes
        self.comments = comments
        self.datePosted = datePosted



@app.route("/", methods = ['POST',"GET"])
def index():
    if request.method == "POST":
        usernameLogin = request.form["inputUsername"]
        usernamePassword = request.form["inputPassword"]
        newUsernameLogin = request.form["inputNewUsername"]
        newUsernamePassword = request.form["inputNewPassword"]
        found_user = userInformations.query.filter_by(username=usernameLogin).first()
        
        if usernameLogin != "" and found_user.password == usernamePassword:
            session['username'] = username=request.form["inputUsername"]

            return redirect(url_for('introDashboard'))
        elif newUsernameLogin!= "":
            usr = userInformations(newUsernameLogin,newUsernamePassword,"member","")
            db.session.add(usr)
            db.session.commit()
            return render_template("loginScreen.html")
        
    return render_template("loginScreen.html")


@app.route("/introDashboard", methods = ['POST',"GET"])
def introDashboard():
    username = session.get('username')
    return render_template("introDashboard.html", username = username)


@app.route("/dashboard/<username>", methods = ['POST',"GET"])
def dashboard(username):
    usernameQuery = userInformations.query.filter_by(username=username).first()

    if request.method =="POST":
        print(request.form)
        if "commentButton" in request.form:
            for key, value in request.form.items():
                if value != '' and "static" not in value and "likeButton" not in value:
                    print(value)
                    pathNum = "path" + str(key.replace("commentButton",""))
                    path = request.form[pathNum]
                    print(path)
                    found_post = userPostingInfo.query.filter_by(pathToPost=path).first()
                    found_post.comments += username+": "+ value +"-"
                    db.session.commit()
                    print(found_post.comments)
                    # print(userPostingInfo.query.offset(int(key.replace("commentButton","")) - 1).first())
                    # print(f"Variable: {key}, Value: {value}")

        if "likesDuringThisPage" in request.form:
            usernameQuery = userInformations.query.filter_by(username=username).first()
            usernameQuery.likedPosts = request.form["likesDuringThisPage"]
            db.session.commit()
        else:
            descriptionText = request.form['descriptionText']
            file = request.files['image']
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
            pathToPost = "static/images/"+file.filename
            today = date.today()
            datePosted = today.strftime("%b %d, %Y")
            postSubmit = userPostingInfo(pathToPost,descriptionText,username,"0","", datePosted)
            db.session.add(postSubmit)
            db.session.commit()


        

    allPathToPostArr = [user.pathToPost for user in userPostingInfo.query.all()]
    allDescriptionArr = [user.description for user in userPostingInfo.query.all()]
    allUsernameArr = [user.username for user in userPostingInfo.query.all()]
    allLikesArr = [user.likes for user in userPostingInfo.query.all()]
    allCommentsArr = [user.comments for user in userPostingInfo.query.all()]
    allDatesArr = [user.datePosted for user in userPostingInfo.query.all()]



    return render_template("dashboard.html", username = username, allPaths = allPathToPostArr, allDescriptions = allDescriptionArr, allUsernames = allUsernameArr, allLikes = allLikesArr, allComments = allCommentsArr, allDates = allDatesArr, userLikes = usernameQuery.likedPosts)




@app.route("/clearAll", methods = ['POST',"GET"])
def clearAll():
    # Drop all tables in the database
    db.drop_all()

    # Create all tables again
    db.create_all()

    # Commit the changes to the database
    db.session.commit()
        
    return render_template("clearAll.html")



with app.app_context():
    db.create_all()
if __name__ == '__main__':
    app.config['UPLOAD_FOLDER'] = 'static/images'
    app.secret_key = 'secretKeyS'
    app.run(debug=True)

