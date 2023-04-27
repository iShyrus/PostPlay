

$(document).ready(function(){
    setTimeout(function(){
        $("#usernameWelcome1").fadeIn(1500);
        $("#usernameWelcome2").fadeIn(1500);
    },1500)

    setTimeout(function(){
        // $("#usernameWelcome1").animate({fontSize:"0"});
        $("#usernameWelcome2").animate({fontSize:"0"});
        $("#welcome1").animate({fontSize:"0"});
        $("#welcome2").animate({fontSize:"0"});
        $("#usernameWelcome1").animate({fontSize:"15"});
        $("#usernameWelcome1").animate({top:"95.5%"});
    },3500)
    setTimeout(function(){
        $("#postingContainer").fadeIn()
    },3500)


    allPaths = JSON.parse(document.getElementById("allPaths").innerText.replaceAll("'",'"'));
    allDescriptions = JSON.parse(document.getElementById("allDescriptions").innerText.replaceAll("'",'"'));
    allUsernames = JSON.parse(document.getElementById("allUsernames").innerText.replaceAll("'",'"'));
    allLikes = JSON.parse(document.getElementById("allLikes").innerText.replaceAll("'",'"'));
    allComments = JSON.parse(document.getElementById("allComments").innerText.replaceAll("'",'"'));
    allDates = JSON.parse(document.getElementById("allDates").innerText.replaceAll("'",'"'));







    for (let i = 0; i < allPaths.length; i++) {
        var postingContainer = document.getElementById("postingContainer");
        var newContainer = document.createElement("div");
        newContainer.classList.add("newContainer");

        const newDescription = document.createElement('p');
        newDescription.classList.add("newText");
        newDescription.textContent = allDescriptions[i]


        const postingUsername = document.createElement('p');
        postingUsername.classList.add("postingUsername");
        postingUsername.textContent = allUsernames[i]

        const postingDate = document.createElement('p');
        postingDate.classList.add("postingDate");
        postingDate.textContent = allDates[i]

        const userImgPosting = document.createElement('img');
        userImgPosting.classList.add("userImgPosting");
        userImgPosting.src = "https://imgtr.ee/images/2023/04/19/0yUKz.png"

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


        newContainer.appendChild(postingDate); 
        newContainer.appendChild(userImgPosting); 
        newContainer.appendChild(newDescription); 
        newContainer.appendChild(postingUsername); 

        postingContainer.appendChild(newContainer);
    }


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




