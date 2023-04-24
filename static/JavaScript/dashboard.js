

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