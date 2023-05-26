$(document).ready(function(){

    incomingRequests = (document.getElementById("incomingRequests").innerText).split("-");
    sentRequests = (document.getElementById("sentRequests").innerText).split("-");
    friendsList = (document.getElementById("friendsList").innerText).split("-");



    var postingContainer = document.getElementById("postingContainer");


    if(incomingRequests!=""){
        const pendingTitle = document.createElement('p');
        pendingTitle.innerText = "Pending";
        pendingTitle.classList.add("pendingTitle");   
        postingContainer.appendChild(pendingTitle);

    }



    for (let i = 0; i < incomingRequests.length-1; i++) {
        const newPendingBox = document.createElement('div');
        newPendingBox.classList.add("newPendingBox");
        newPendingBox.setAttribute("id", "incomingBox"+i)

        const incomingName = document.createElement('p');
        incomingName.classList.add("incomingName");
        incomingName.innerText = incomingRequests[i]

        const acceptButton = document.createElement("button")
        acceptButton.classList.add("acceptButton")
        acceptButton.setAttribute("id","$accepted$"+incomingRequests[i])
        acceptButton.setAttribute("name",i)

        acceptButton.setAttribute("onclick", "acceptRejectButton(this.id)")
        const acceptButtonImage = document.createElement("img")
        acceptButtonImage.src = "/static/staticImages/accept.png"
        acceptButtonImage.classList.add("acceptButtonImage")
        acceptButton.appendChild(acceptButtonImage)

        const rejectButton = document.createElement("button")
        rejectButton.classList.add("rejectButton")
        rejectButton.setAttribute("id","$rejected$"+incomingRequests[i])
        rejectButton.setAttribute("onclick", "acceptRejectButton(this.id)")
        rejectButton.setAttribute("name",i)
        const rejectButtonImage = document.createElement("img")
        rejectButtonImage.src = "/static/staticImages/decline.png"
        rejectButtonImage.classList.add("acceptButtonImage")
        rejectButton.appendChild(rejectButtonImage)

        newPendingBox.appendChild(rejectButton)
        newPendingBox.appendChild(acceptButton)
        newPendingBox.appendChild(incomingName)
        postingContainer.appendChild(newPendingBox);
    }

    const onlineTitle = document.createElement('p');
    onlineTitle.innerText = "Online";
    onlineTitle.classList.add("onlineTitle");
    postingContainer.appendChild(onlineTitle);

    for (let i = 0; i < friendsList.length-1; i++) {
        
        const newFriendsBox = document.createElement('div');
        newFriendsBox.classList.add("newFriendsBox");
        newFriendsBox.setAttribute("id", "incomingBox"+i);

        const incomingName = document.createElement('p');
        incomingName.classList.add("friendsName");
        incomingName.innerText = friendsList[i];
        newFriendsBox.appendChild(incomingName)

        const messageButton = document.createElement("button")
        messageButton.classList.add("messageButton")
        messageButton.setAttribute("id","$message$"+friendsList[i])
        messageButton.setAttribute("onclick", "messageButton(this.id)")
        const messageButtonImage = document.createElement("img")
        messageButtonImage.src = "/static/staticImages/whiteMessage.png"
        messageButtonImage.classList.add("messageButtonImage")
        messageButton.appendChild(messageButtonImage)

        newFriendsBox.appendChild(messageButton)


        postingContainer.appendChild(newFriendsBox)
    }


    
    
    var postingContainer = document.getElementById("postingContainer");
    const incomingFriendsList = document.createElement("input")
    incomingFriendsList.setAttribute("id","incomingFriendsList")
    incomingFriendsList.setAttribute("name","incomingFriendsList")
    incomingFriendsList.value = document.getElementById("incomingRequests").innerText
    incomingFriendsList.style.display = "none";
    usernameText = document.getElementById("usernameText").innerText
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "/dashboard/"+usernameText+"/friends");
    form.setAttribute("name", "acceptRejectRequest");
    form.setAttribute("id", "formRequest")
    form.appendChild(incomingFriendsList);
    postingContainer.appendChild(form);

    var form = document.getElementById("sendFriendRequestForm")
    $('#friendsInput').keydown(function(event) {
        if (event.which === 13) {
          event.preventDefault(); // Prevent form submission
          submitFriendRequest()
        }
      });

})

function acceptRejectButton(statusUsername){
    boxNum = document.getElementById(statusUsername).getAttribute("name")
    document.getElementById("incomingBox"+boxNum).remove();
    document.getElementById("incomingFriendsList").value= statusUsername
    form = document.getElementById("formRequest")
    form.submit()
}

function messageButton(friendUsername){
    alert(friendUsername)
}

function submitFriendRequest(){
    friendInput = document.getElementById("friendsInput").value
    userList = document.getElementById("allUsers").innerText.replace("[","").replace("]","").replaceAll("'","").replace(" ","").split(",")
    var form = document.getElementById("sendFriendRequestForm");
    for (let i = 0; i < userList.length; i++) {
        if(userList[i].replace(" ","")==friendInput){
            form.submit()
        }
        else{
            $("#invalid").fadeIn(300);
        }
    }
}





