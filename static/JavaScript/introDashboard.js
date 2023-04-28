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
        username = (document.getElementById("usernameWelcome1").innerText)
        window.location.href = "http://127.0.0.1:5000/dashboard/"+username;
    },4350)


});