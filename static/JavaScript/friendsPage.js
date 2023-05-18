$(document).ready(function(){

    incomingRequests = (document.getElementById("incomingRequests").innerText).split("-")
    sentRequests = (document.getElementById("sentRequests").innerText).split("-")




    for (let i = 0; i < sentRequests.length; i++) {
        const newPendingBox = document.createElement('div');
        newPendingBox.classList.add("newPendingBox");
        var postingContainer = document.getElementById("postingContainer");
        postingContainer.appendChild(newPendingBox);


    }


})