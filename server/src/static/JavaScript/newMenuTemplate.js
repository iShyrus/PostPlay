function homeClick(){
    username = (document.getElementById("usernameText").innerText)
    window.location.href = "/dashboard/"+username;

}

function friendsPage(){

    $("#postingContainer").fadeOut(1000);
    $(".backgroundImg").fadeOut(1000);

    setTimeout(function() {
        $(".newContainer").fadeOut(100);
        $("#userPostingBox").fadeOut(100);
        $("#postingContainer").fadeIn(1000);
        $("#postingContainer").animate({height:"101%"});
    }, 1000);


    setTimeout(function() {
        $("#postingContainer").fadeIn(1000);
    }, 1000);

    username = (document.getElementById("usernameText").innerText)

    setTimeout(function() {
        window.location.href = "http://127.0.0.1:5000/dashboard/"+username+"/friends";
    }, 1000);

}