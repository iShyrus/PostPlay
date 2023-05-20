$(document).ready(function(){

    incomingRequests = (document.getElementById("incomingRequests").innerText).split("-")
    sentRequests = (document.getElementById("sentRequests").innerText).split("-")




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
        var postingContainer = document.getElementById("postingContainer");
        postingContainer.appendChild(newPendingBox);


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

})

function acceptRejectButton(statusUsername){
    boxNum = document.getElementById(statusUsername).getAttribute("name")
    document.getElementById("incomingBox"+boxNum).remove();
    document.getElementById("incomingFriendsList").value= statusUsername
    form = document.getElementById("formRequest")
    form.submit()
}

