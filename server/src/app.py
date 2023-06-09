from flask import Flask, redirect, url_for, request, render_template, session, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_admin import Admin
from datetime import date
import pusher

pusher_client = pusher.Pusher(
  app_id='1605592',
  key='8a526bc7ea075b1655a8',
  secret='fb6a68873275f928f848',
  cluster='us3',
  ssl=True
)


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
admin = Admin(app)
db = SQLAlchemy(app)

class userInformations(db.Model):
    username = db.Column("username", db.String ,primary_key=True)
    password = db.Column("password", db.String)
    status = db.Column("status", db.String)
    likedPosts = db.Column("likedPosts", db.String)
    friends = db.Column("friends", db.String)
    incomingfriendRequests = db.Column("incomingfriendRequests", db.String)
    sentFriendRequests = db.Column("sentFriendRequests", db.String)

    def __init__(self, username, password, status, likedPosts,friends, incomingfriendRequests, sentFriendRequests):
        self.username = username
        self.password = password
        self.status = status
        self.likedPosts = likedPosts
        self.friends = friends
        self.incomingfriendRequests = incomingfriendRequests
        self.sentFriendRequests = sentFriendRequests

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

class chatLobbyDB(db.Model):
    chatLobbyName = db.Column("chatLobbyName", db.String ,primary_key=True)
    messages = db.Column("messages", db.String)


    def __init__(self, chatLobbyName, messages):
        self.chatLobbyName = chatLobbyName
        self.messages = messages




@app.route("/", methods = ['POST',"GET"])
def index():
    userCount = userInformations.query.count()
    users = [user.username for user in userInformations.query.all()]
    usersPassword = [user.password for user in userInformations.query.all()]

    if request.method == "POST":
        usernameLogin = request.form["inputUsername"]
        usernamePassword = request.form["inputPassword"]
        newUsernameLogin = request.form["inputNewUsername"]
        newUsernamePassword = request.form["inputNewPassword"]
        found_user = userInformations.query.filter_by(username=usernameLogin).first()

        if found_user:
            if usernameLogin != "" and found_user.password == usernamePassword:
                session['username'] = request.form["inputUsername"]

            return redirect(url_for('introDashboard'))
        if newUsernameLogin!= "":
            usr = userInformations(newUsernameLogin,newUsernamePassword,"member","","","","")
            db.session.add(usr)
            db.session.commit()
            return redirect(url_for('index'))

    return render_template("loginScreen.html" , userCountHTML = userCount, usersHTML = users, passwordHTML = usersPassword)



@app.route("/introDashboard", methods = ['POST',"GET"])
def introDashboard():
    username = session.get('username')
    return render_template("introDashboard.html", username = username)



@app.route("/dashboard/<username>", methods = ['POST',"GET"])
def dashboard(username):
    username = session.get('username')
    usernameQuery = userInformations.query.filter_by(username=username).first()
    allPathToPostArr = [user.pathToPost for user in userPostingInfo.query.all()]
    allDescriptionArr = [user.description for user in userPostingInfo.query.all()]
    allUsernameArr = [user.username for user in userPostingInfo.query.all()]
    allLikesArr = [user.likes for user in userPostingInfo.query.all()]
    allCommentsArr = [user.comments for user in userPostingInfo.query.all()]
    allDatesArr = [user.datePosted for user in userPostingInfo.query.all()]



    if request.method =="POST":
        if "commentButton" in request.form:
            for key, value in request.form.items():
                if value != '' and "static" not in value and "likeButton" not in value:
                    pathNum = "path" + str(key.replace("commentButton",""))
                    path = request.form[pathNum]
                    found_post = userPostingInfo.query.filter_by(pathToPost=path).first()
                    found_post.comments += username+": "+ value +"-"
                    db.session.commit()
                    # print(userPostingInfo.query.offset(int(key.replace("commentButton","")) - 1).first())
                    # print(f"Variable: {key}, Value: {value}")

        if "likesDuringThisPage" in request.form:
            usernameQuery = userInformations.query.filter_by(username=username).first()
            previous = usernameQuery.likedPosts
            usernameQuery.likedPosts = request.form["likesDuringThisPage"]

            for x in range(len(allDatesArr)):
                pathNum = "path" + str(x)
                path = request.form[pathNum]
                found_post = userPostingInfo.query.filter_by(pathToPost=path).first()
                if str(x) in previous and str(x) not in request.form["likesDuringThisPage"]:
                    strToInt = int(found_post.likes) - 1
                    found_post.likes = str(strToInt)
                elif str(x) in request.form["likesDuringThisPage"] and str(x) not in previous:
                    strToInt = int(found_post.likes) + 1
                    found_post.likes = str(strToInt)            

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

    allUsers = [user.username for user in userPostingInfo.query.all()]
    allPathToPostArr = [user.pathToPost for user in userPostingInfo.query.all()]
    allDescriptionArr = [user.description for user in userPostingInfo.query.all()]
    allUsernameArr = [user.username for user in userPostingInfo.query.all()]
    allLikesArr = [user.likes for user in userPostingInfo.query.all()]
    allCommentsArr = [user.comments for user in userPostingInfo.query.all()]
    allDatesArr = [user.datePosted for user in userPostingInfo.query.all()]
    friendsList = usernameQuery.friends
    chatLobbies = [chat.chatLobbyName for chat in chatLobbyDB.query.all()]
    chatMessages = [chat.messages for chat in chatLobbyDB.query.all()]
    return render_template("dashboard.html", username = session.get('username'), allPaths = allPathToPostArr, allDescriptions = allDescriptionArr, allUsernames = allUsernameArr, allLikes = allLikesArr, allComments = allCommentsArr, allDates = allDatesArr, userLikes = usernameQuery.likedPosts, friendsListHTML = friendsList, chatLobbiesHTML = chatLobbies, chatMessagesHTML = chatMessages, allUsersHTML = allUsers)



@app.route("/dashboard/<username>/friends", methods=['POST', 'GET'])
def friends(username):
    if request.method =="POST":
        print(request.form)
        if "sendingFriendRequest" in request.form:
            usernameQuery = userInformations.query.filter_by(username=username).first()

            allFriendRequests = usernameQuery.sentFriendRequests + request.form["sendingFriendRequest"] + "-"
            usernameQuery.sentFriendRequests = allFriendRequests
            userRecieving = userInformations.query.filter_by(username=request.form["sendingFriendRequest"]).first()
            allIncoming = userRecieving.incomingfriendRequests + username +"-"
            userRecieving.incomingfriendRequests = allIncoming
            db.session.commit()

        if "incomingFriendsList" in request.form:

            requestStatus = request.form["incomingFriendsList"]
            if "accepted" in request.form["incomingFriendsList"]:
                user = requestStatus.replace("$accepted$", "")

                userInfoSending = userInformations.query.filter_by(username=user).first()
                sentFriendRequests = userInfoSending.sentFriendRequests
                sentFriendRequests = sentFriendRequests.replace(username+"-","")
                userInfoSending.sentFriendRequests = sentFriendRequests

                userInfoRecieving = userInformations.query.filter_by(username=username).first()
                incomingFriendRequests = userInfoRecieving.incomingfriendRequests
                incomingFriendRequests = incomingFriendRequests.replace(user+"-","")
                userInfoRecieving.incomingfriendRequests = incomingFriendRequests


                userSendingFriends = userInfoSending.friends
                userRecievingFriends = userInfoRecieving.friends

                userSendingFriends += username+"-"
                userRecievingFriends += user+"-"

                userInfoSending.friends = userSendingFriends
                userInfoRecieving.friends = userRecievingFriends

                print(userInfoSending.friends)
                print(userInfoRecieving.friends)

                arr = [user,username]
                arr.sort()
                newChatLobby = chatLobbyDB(arr[0]+"-"+arr[1], "")
                db.session.add(newChatLobby)

                db.session.commit()

            if "rejected" in request.form["incomingFriendsList"]:
                print("rejected")        
    usernameQuery = userInformations.query.filter_by(username=username).first()
    incomingRequests = usernameQuery.incomingfriendRequests
    sentRequests = usernameQuery.sentFriendRequests
    friendsList = usernameQuery.friends
    allUsers = [user.username for user in userInformations.query.all()]
    print(allUsers)
    return render_template("friendsPage.html", username=username, incomingRequestsHTML = incomingRequests, sentRequestsHTML = sentRequests, friendsListHTML = friendsList, allUsersHTML = allUsers)



@app.route("/clearAll", methods = ['POST',"GET"])
def clearAll():
    db.drop_all()
    db.create_all()
    db.session.commit()
    return render_template("clearAll.html")



@app.route("/check", methods =["POST","GET"])
def check():
    pusher_client.trigger('my-channel', 'my-event', {'message': 'hello world'})
    return render_template("check.html")




@app.route("/message",methods = ['POST'])
def message():

    name = request.form.get('username')
    message = request.form.get('message')
    chatLobby = request.form.get("chatLobby")
    chatLobbyList = chatLobbyDB.query.filter_by(chatLobbyName=chatLobby).first()

    if chatLobbyList:
        chatLobbyList.messages += name + ": " + message +"-" 
        db.session.commit()
    else:
        createChatLobby = chatLobbyDB(chatLobby,name + ": " + message +"-")
        db.session.add(createChatLobby)
        db.session.commit()
    pusher_client.trigger(chatLobby, 'new-message', {'username':name, 'message': message})
    return ""



with app.app_context():
    db.create_all()
if __name__ == '__main__':
    app.config['UPLOAD_FOLDER'] = 'static/images'
    app.secret_key = 'secretKeyS'
    app.run(debug=True)

