var userLikes=""
var likedButtonArr =""

$(document).ready(function(){

    setTimeout(function(){
        $("#postingContainer").fadeIn(1500)
    },300)


    allPaths = JSON.parse(document.getElementById("allPaths").innerText.replaceAll("'",'"'));
    allDescriptions = JSON.parse(document.getElementById("allDescriptions").innerText.replaceAll("'",'"'));
    allUsernames = JSON.parse(document.getElementById("allUsernames").innerText.replaceAll("'",'"'));
    allLikes = JSON.parse(document.getElementById("allLikes").innerText.replaceAll("'",'"'));
    allComments = JSON.parse(document.getElementById("allComments").innerText.replaceAll("'",'"'));
    allDates = JSON.parse(document.getElementById("allDates").innerText.replaceAll("'",'"'));
    allComments = JSON.parse(document.getElementById("allComments").innerText.replaceAll("'",'"'));
    // for (let i = 0; i < allComments.length; i++) {
    //     postsComments = allComments[i].split("-")
    //     for(let j = 0; j < postsComments.length; j++){
    //         alert(j)
    //         alert(postsComments[j])
    //     }
    // }

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "/dashboard/Shyrus");
    form.setAttribute("id", "postLikes");

    for (let i = 0; i < allPaths.length; i++) {

        var postingContainer = document.getElementById("postingContainer");
        var newContainer = document.createElement("div");
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
        userImgPosting.src = "https://imgtr.ee/images/2023/04/19/0yUKz.png"

        const likeButton = document.createElement('button');
        likeButton.classList.add("likeButton");
        likeButton.setAttribute("onclick", "likeButton(this.id)")
        likeButton.setAttribute("id", "likeButton"+i)
        likeButton.setAttribute("type", "button")


        const commentButtonImg = document.createElement('img');
        commentButtonImg.src = "https://imgtr.ee/images/2023/04/28/JqoL7.png"
        commentButtonImg.classList.add("commentButtonImg");

        
        const commentButton = document.createElement('button');
        commentButton.classList.add("commentButton");
        commentButton.setAttribute("onclick", "commentButton(this.id)");
        commentButton.setAttribute("id", "commentButton"+i);
        commentButton.setAttribute("type", "button");
        commentButton.setAttribute("onclick", "commentButtonClicked(this.id)");
        commentButton.appendChild(commentButtonImg)


        const commentInput = document.createElement('input');
        commentInput.classList.add("commentInput");
        commentInput.setAttribute("placeholder", "Comment Here");
        commentInput.setAttribute("id", "commentButton"+i+"Input");
        commentInput.setAttribute("name", "commentButton"+i);

        const submitComment = document.createElement('button');
        submitComment.setAttribute("id", "commentButton"+i+"Submit");
        submitComment.setAttribute("name", "commentButton");
        submitComment.setAttribute("onclick", "commentButtonSubmitForm()");
        submitComment.classList.add("submitComment");

        const totalLikes = document.createElement('p');
        totalLikes.classList.add("totalLikesText")
        totalLikes.innerText = allLikes[i]

        const path = document.createElement('input');
        path.setAttribute("name", "path"+i);
        path.value = allPaths[i]






        if(document.getElementById("userLikes").innerText.includes("likeButton"+i) === true){
            const greenLikeButton =document.createElement('img');
            greenLikeButton.src = "https://imgtr.ee/images/2023/04/28/JoyVl.png"
            greenLikeButton.classList.add("sizeOfLikeButton");
            greenLikeButton.setAttribute("id","likeButton"+i+"Img")
            likeButton.appendChild(greenLikeButton)

        }
        else{
            const greyLikeButton =document.createElement('img');
            greyLikeButton.src = "https://imgtr.ee/images/2023/04/28/Jo033.png"
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
            newContainer.appendChild(newPicture)
        }

        newDescriptionBox.appendChild(newDescription);
        postsComments = allComments[i].split("-")
        for(let j = 0; j < postsComments.length; j++){

            const usersComments = document.createElement("p")
            usersComments.classList.add("newDescription");
            usersComments.textContent = postsComments[j]
            newDescriptionBox.appendChild(usersComments)
        }
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

    const likesDuringThisPage = document.createElement('input');
    likesDuringThisPage.textContent = "";
    likesDuringThisPage.setAttribute("id", "likesDuringThisPage");
    likesDuringThisPage.setAttribute("name", "likesDuringThisPage");
    likesDuringThisPage.value = document.getElementById("userLikes").innerText;
    form.appendChild(likesDuringThisPage);

    userLikes = document.getElementById("userLikes").innerText
    likedButtonArr = userLikes.split(",")


});

var loadFile = function(event) {
    $("#userPostingBox").animate({top:"25%"});
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
    if(likedButtonArr.includes(clickedID) === true){
        var index = likedButtonArr.indexOf(clickedID);
        likedButtonArr.splice(index, 1);
        document.getElementById(clickedID+"Img").src = "https://imgtr.ee/images/2023/04/28/Jo033.png"
    }
    else{
        likedButtonArr.push(clickedID);
        document.getElementById(clickedID+"Img").src = "https://imgtr.ee/images/2023/04/28/JoyVl.png"

    }
    document.getElementById("likesDuringThisPage").value = likedButtonArr    
}

function commentButtonClicked(clickedID){
    $("#"+clickedID+"Input").fadeIn(300);
    $("#"+clickedID+"Input").animate({width:"300px"});
}

function commentButtonSubmitForm(){

}

// window.addEventListener('beforeunload', function() {
//     // Access the form and submit it
//     alert("test")
//     var form = document.getElementById('postLikes');
//     form.submit();
// });

function likeSubmit(){

}




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