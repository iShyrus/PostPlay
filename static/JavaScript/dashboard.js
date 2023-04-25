

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




