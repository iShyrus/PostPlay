var userLikes=""
var likedButtonArr =""
planeArr = ["/static/staticImages/bluePlaneTransparent.png",
            "/static/staticImages/redPlaneTransparent.png",
            "/static/staticImages/yellowPlaneTransparent.png",
            "/static/staticImages/purplePlaneTransparent.png",
            "/static/staticImages/greenPlaneTransparent.png"
            ]



function postingList(){
    allPaths = JSON.parse(document.getElementById("allPaths").innerText.replaceAll("'",'"'));
    allDescriptions = JSON.parse(document.getElementById("allDescriptions").innerText.replaceAll("'",'"'));
    allUsernames = JSON.parse(document.getElementById("allUsernames").innerText.replaceAll("'",'"'));
    allLikes = JSON.parse(document.getElementById("allLikes").innerText.replaceAll("'",'"'));
    allComments = JSON.parse(document.getElementById("allComments").innerText.replaceAll("'",'"'));
    allDates = JSON.parse(document.getElementById("allDates").innerText.replaceAll("'",'"'));
    allComments = JSON.parse(document.getElementById("allComments").innerText.replaceAll("'",'"'));
    allLikes = JSON.parse(document.getElementById("allLikes").innerText.replaceAll("'",'"'));

    usernameText = document.getElementById("usernameText").innerText
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "/dashboard/"+usernameText);
    form.setAttribute("id", "postLikes");


    for (let i = 0; i < allPaths.length; i++) {
        // if(allUsernames[i] == "perryyuen"){
        postsComments = allComments[i].split("-")

        var postingContainer = document.getElementById("postingContainer");
        var newContainer = document.createElement("div");
        height = 550 + (postsComments.length*22)
        newContainer.style.height = height+"px";
        newContainer.classList.add("newContainer");

        const newDescriptionBox = document.createElement('div');
        newDescriptionBox.classList.add("newDescriptionBox");

        
        const newDescription = document.createElement('p');
        newDescription.classList.add("newDescription");
        newDescription.textContent = allUsernames[i]+": "+allDescriptions[i]
        

        const postingUsername = document.createElement('p');
        postingUsername.classList.add("postingUsername");
        postingUsername.textContent = allUsernames[i]

        const postingDate = document.createElement('p');
        postingDate.classList.add("postingDate");
        postingDate.textContent = allDates[i]

        const userImgPosting = document.createElement('img');
        userImgPosting.classList.add("userImgPosting");
        userImgPosting.src = "/static/staticImages/userProfile.png"

        const likeButton = document.createElement('button');
        likeButton.classList.add("likeButton");
        likeButton.setAttribute("onclick", "likeButton(this.id)")
        likeButton.setAttribute("id", "likeButton"+i)
        likeButton.setAttribute("type", "button")
        likeButton.style.top = height-55


        const commentButtonImg = document.createElement('img');
        commentButtonImg.src = "/static/staticImages/commentButton.png"
        commentButtonImg.classList.add("commentButtonImg");
        

        
        const commentButton = document.createElement('button');
        commentButton.classList.add("commentButton");
        commentButton.setAttribute("onclick", "commentButton(this.id)");
        commentButton.setAttribute("id", "commentButton"+i);
        commentButton.setAttribute("type", "button");
        commentButton.setAttribute("onclick", "commentButtonClicked(this.id)");
        commentButton.appendChild(commentButtonImg)
        commentButton.style.top = height-53


        const commentInput = document.createElement('input');
        commentInput.classList.add("commentInput");
        commentInput.setAttribute("placeholder", "Comment Here (47 Char Limit)");
        commentInput.setAttribute("id", "commentButton"+i+"Input");
        commentInput.setAttribute("name", "commentButton"+i);
        commentInput.style.top = height-12

        const submitComment = document.createElement('button');
        submitComment.setAttribute("id", "commentButton"+i+"Submit");
        submitComment.setAttribute("name", "commentButton");
        submitComment.setAttribute("onclick", "commentButtonSubmitForm()");
        submitComment.style.top = height-14
        submitComment.classList.add("submitComment");

        const  submitCommentImg = document.createElement("img");
        submitCommentImg.src = "https://cdn-icons-png.flaticon.com/512/1828/1828380.png";
        submitCommentImg.classList.add("submitCommentImg")
        submitComment.appendChild(submitCommentImg);
        submitComment.style.display = "none"

        const totalLikes = document.createElement('p');
        totalLikes.classList.add("totalLikesText")
        totalLikes.setAttribute("id", "totalLikes"+i);

        totalLikes.innerText = "Likes: " + allLikes[i]
        totalLikes.style.top = height-60

        const path = document.createElement('input');
        path.setAttribute("name", "path"+i);
        path.style.display = "none"
        path.value = allPaths[i]

        const numberOfLikes = document.createElement('p');
    


        if(document.getElementById("userLikes").innerText.includes("likeButton"+i) === true){
            const greenLikeButton =document.createElement('img');
            greenLikeButton.src = "/static/staticImages/likedImage.png"
            greenLikeButton.classList.add("sizeOfLikeButton");
            greenLikeButton.setAttribute("id","likeButton"+i+"Img")
            likeButton.appendChild(greenLikeButton)

        }
        else{
            const greyLikeButton =document.createElement('img');
            greyLikeButton.src = "/static/staticImages/noLikedImage.png"
            greyLikeButton.classList.add("sizeOfLikeButton");
            greyLikeButton.setAttribute("id","likeButton"+i+"Img")
            likeButton.appendChild(greyLikeButton) 
        }



        // https://imgtr.ee/i/Jo033
        // https://imgtr.ee/i/JoyVl
        // https://imgtr.ee/images/2023/04/28/JqoL7.png
        
        // https://imgtr.ee/images/2023/04/28/Jqfhi.png
        // https://imgtr.ee/images/2023/04/28/JqiXr.png
        // https://imgtr.ee/images/2023/04/28/Jq3vn.png
        if (allPaths[i].includes(".mp4")){
            var newVideo = document.createElement("video");
            newVideo.src = "../"+allPaths[i]
            newVideo.classList.add("newVideo");
            newVideo.setAttribute('controls', '');
            newContainer.appendChild(newVideo)
        }
        else{
            var newPicture = document.createElement("img");
            newPicture.src = "../"+allPaths[i]
            newPicture.classList.add("newPicture")
            newContainer.appendChild(newPicture)
        }

        newDescriptionBox.appendChild(newDescription);

        for(let j = 0; j < postsComments.length; j++){
            const usersComments = document.createElement("p")
            usersComments.classList.add("newDescription");
            usersComments.textContent = postsComments[j]
            newDescriptionBox.appendChild(usersComments)
        }
        newContainer.appendChild(totalLikes)
        newContainer.appendChild(commentInput)
        newContainer.appendChild(likeButton); 
        newContainer.append(commentButton)
        newContainer.appendChild(postingDate); 
        newContainer.appendChild(userImgPosting); 
        newContainer.appendChild(newDescriptionBox); 
        newContainer.appendChild(postingUsername); 
        newContainer.appendChild(submitComment);
        newContainer.appendChild(path);


        form.appendChild(newContainer)
        postingContainer.appendChild(form);
    }
// }

    const likesDuringThisPage = document.createElement('input');
    likesDuringThisPage.textContent = "";
    likesDuringThisPage.setAttribute("id", "likesDuringThisPage");
    likesDuringThisPage.setAttribute("name", "likesDuringThisPage");
    likesDuringThisPage.value = document.getElementById("userLikes").innerText;
    likesDuringThisPage.style.display = "none"
    form.appendChild(likesDuringThisPage);

    userLikes = document.getElementById("userLikes").innerText
    likedButtonArr = userLikes.split(",")
}




$(document).ready(function(){


    pixel = (Math.floor(Math.random() * (290 - 50 + 1)) + 50)
    pixel1 = (Math.floor(Math.random() * (290 - 50 + 1)) + 50)
    document.getElementById("airplane").src = planeArr[Math.floor(Math.random() * (4 - 0 + 1)) + 0]
    document.getElementById("airplane").style.top= pixel+"px";
    document.getElementById("airplane1").src = planeArr[Math.floor(Math.random() * (4 - 0 + 1)) + 0]
    document.getElementById("airplane1").style.top= pixel1+"px";

    //Random Airplanes
    setInterval(()=> {
        pixel = (Math.floor(Math.random() * (290 - 50 + 1)) + 50)
        document.getElementById("airplane").style.top= pixel+"px";
        document.getElementById("airplane").src = planeArr[Math.floor(Math.random() * (4 - 0 + 1)) + 0]
    }, 50000)
    setInterval(()=> {
        pixel = (Math.floor(Math.random() * (290 - 50 + 1)) + 50)
        document.getElementById("airplane1").style.top= pixel+"px";
        document.getElementById("airplane1").src = planeArr[Math.floor(Math.random() * (4 - 0 + 1)) + 0]
    }, 40000)

    setTimeout(function(){
        $("#postingContainer").fadeIn(1500)
    },300)


    postingList()


});

var loadFile = function(event) {

    $("#userPostingBox").animate({height:"460px"});
    $("#userPostingText").animate({top:"90%"});
    $("#fileUploadImage").animate({top:"90%"});
    $("#submitButton").animate({top:"90%"});

    const selectedFile = event.target.files[0];
    if(selectedFile.type.startsWith('image/')){
        $("#previewVideo").fadeOut(1000);
        $("#previewImage").fadeIn(1000);
        var output = document.getElementById('previewImage');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src) 
        }
    }
    else if(selectedFile.type.startsWith('video/')){
        $("#previewVideo").fadeIn(1000);
        $("#previewImage").fadeOut(1000);
        file = event.target.files[0];
        blobURL = URL.createObjectURL(file);
        document.querySelector("video").src = blobURL;
    }
  };


function likeButton(clickedID){
    totalLikes = clickedID.replace("likeButton","totalLikes")
    

    if(likedButtonArr.includes(clickedID) === true){
        var index = likedButtonArr.indexOf(clickedID);
        likedButtonArr.splice(index, 1);
        document.getElementById(clickedID+"Img").src = "/static/staticImages/noLikedImage.png"
        totalLikes = clickedID.replace("likeButton","totalLikes")
        allLikes[totalLikes.replace("totalLikes","")] -=1
    }
    else{
        likedButtonArr.push(clickedID);
        document.getElementById(clickedID+"Img").src = "/static/staticImages/likedImage.png"
        parse = parseInt(allLikes[totalLikes.replace("totalLikes","")]) + 1
        allLikes[totalLikes.replace("totalLikes","")] =parse
    }
    document.getElementById(totalLikes).innerText = "Likes: " + allLikes[totalLikes.replace("totalLikes","")]
    document.getElementById("likesDuringThisPage").value = likedButtonArr    
}

function commentButtonClicked(clickedID){
    $("#"+clickedID+"Input").fadeIn(300);
    $("#"+clickedID+"Input").animate({width:"300px"});
    $("#"+"commentButton"+clickedID.replace("commentButton", "")+"Submit").fadeIn(300)
}

function commentButtonSubmitForm(){}

// window.addEventListener('beforeunload', function() {
//     // Access the form and submit it
//     alert("test")
//     var form = document.getElementById('postLikes');
//     form.submit();
// });





$(document).ready(function() {
    // Restore the scroll position
    var scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition !== null) {
        $(window).scrollTop(scrollPosition);
        sessionStorage.removeItem('scrollPosition');
    }

    // Store the scroll position before leaving the page
    $(window).on('beforeunload', function() {
        sessionStorage.setItem('scrollPosition', $(window).scrollTop());
    });
});
