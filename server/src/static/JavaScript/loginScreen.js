planeArr = ["/static/staticImages/bluePlaneTransparent.png",
            "/static/staticImages/redPlaneTransparent.png",
            "/static/staticImages/yellowPlaneTransparent.png",
            "/static/staticImages/purplePlaneTransparent.png",
            "/static/staticImages/greenPlaneTransparent.png"
            ]

$(document).ready(function(){
    //Random Starter Airplanes
    pixel = (Math.floor(Math.random() * (290 - 50 + 1)) + 50)
    pixel1 = (Math.floor(Math.random() * (290 - 50 + 1)) + 50)
    document.getElementById("airplane").src = planeArr[Math.floor(Math.random() * (4 - 0 + 1)) + 0]
    document.getElementById("airplane").style.top= pixel+"px";
    document.getElementById("airplane1").src = planeArr[Math.floor(Math.random() * (4 - 0 + 1)) + 0]
    document.getElementById("airplane1").style.top= pixel1+"px";

    //Random Starter Buildings
    var img = new Image();
    img.src = "https://imgtr.ee/images/2023/04/18/0MCrx.png"

    //Fade Out/In button functions
    setTimeout(function(){
        $("#inputUsername").fadeIn(1500);
        $("#inputPassword").fadeIn(1500);
        $("#loginButton").fadeIn(1500);
        $("#splitLine").fadeIn(1500);
        $("#newText").fadeIn(1500);
        $("#signUpButton").fadeIn(1500);
        $("#websiteNameBack").fadeIn(1500);
        $("#websiteNameFront").fadeIn(1500);
        $("#text").fadeIn(1500);
        $("#moon").fadeIn(1500);
        $("#building1").fadeIn(1500);
        $("#building2").fadeIn(1500);
        $("#building3").fadeIn(1500);
        $("#building4").fadeIn(1500);
        $("#building5").fadeIn(1500);
        $("#building6").fadeIn(1500);
        $("#memberCount").fadeIn(1500);

    },1500)
    
    $("#loginButton").click(function () {

        // var parsedList = JSON.parse(usernames);
        usernames = usernames.replaceAll("'",'"')
        usernamesArr = JSON.parse(usernames)
        password = password.replaceAll("'",'"')
        passwordArr = JSON.parse(password)
        userInput = document.getElementById("inputUsername").value
        passwordInput = document.getElementById("inputPassword").value
        for (let i = 0; i < usernamesArr.length; i++) {
            if(usernamesArr[i] ==userInput && passwordArr[i] ==passwordInput){
                $("#newText").animate({fontSize:'0'})
                $(".inputContainer").animate({fontSize:'0'})
                $(".inputContainer").animate({height:'0'})
                $("#loginButton").animate({fontSize:'0'})
                $("#signUpButton").animate({fontSize:'0'})
                $("#loginButton").animate({height:'0'})
                $("#signUpButton").animate({height:'0'})
                $("#websiteNameBack").animate({fontSize:'0'})
                $("#websiteNameFront").animate({fontSize:'0'})
                $("#text").animate({fontSize:'0'})
                $("#movingCloud0").fadeOut(1500)
                $("#movingCloud1").fadeOut(1500)
                $("#movingCloud2").fadeOut(1500)
                $("#movingCloud3").fadeOut(1500)
                $("#movingCloud4").fadeOut(1500)
                $("#movingCloud5").fadeOut(1500)
                $("#movingCloud6").fadeOut(1500)
                $("#movingCloud7").fadeOut(1500)
                $("#movingCloud8").fadeOut(1500)
                $("#airplane").fadeOut(1500)
                $("#airplane1").fadeOut(1500)
                $("#moon").fadeOut(1500)
                $("#building1").fadeOut(1500)
                $("#building2").fadeOut(1500)
                $("#building3").fadeOut(1500)
                $("#building4").fadeOut(1500)
                $("#building5").fadeOut(1500)
                $("#building6").fadeOut(1500)
                $("#invalid").fadeOut(1500)
                $("#memberCount").fadeOut(1500)

                setTimeout(function(){
                    $("#loginContainer").animate({height:'0'})
                },950)
                setTimeout(function(){
                    $(".inputContainer").fadeOut(500)
                    $(".inputContainer").fadeOut(500)
                    $("#loginButton").fadeOut(500)
                    $("#signUpButton").fadeOut(500)
                    $("#loginButton").fadeOut(500)
                    $("#signUpButton").fadeOut(500)
                    $("#splitLine").fadeOut(500)
                },950)
                setTimeout(function(){
                    var form = document.getElementById("submitLogin");
                    form.submit()
                },2480)
                break;
            }
            if(i ==usernamesArr.length-1){
                $("#invalid").fadeIn(300)
                $("#invalid").effect("shake");

            }

        }


    });
    
    $("#signUpButton").click(function () {
        $(".inputContainer").animate({fontSize:'0'})
        $(".inputContainer").animate({height:'0'})
        $(".inputContainer").fadeOut(500)
        $("#loginButton").animate({fontSize:'0'})
        $("#loginButton").animate({height:'0'})
        $("#loginButton").fadeOut(500)
        $("#newText").animate({fontSize:'0px'})
        $("#signUpButton").animate({fontSize:'0'})
        $("#signUpButton").animate({height:'0'})
        $("#signUpButton").fadeOut(500)
        setTimeout(function(){
            $(".inputNewContainer").fadeIn(200)
            $(".inputNewContainer").animate({height:'35px'})
            $(".inputNewContainer").animate({fontSize:'12px'})
            $("#createButton").fadeIn(200)
            $("#createButton").animate({height:'45px'})
            $("#createButton").animate({fontSize:'14px'})
            $("#loginChangeButton").fadeIn(200)
            $("#loginChangeButton").animate({height:'45px'})
            $("#loginChangeButton").animate({fontSize:'14px'})
            $("#loginText").animate({fontSize:'10px'})
        },980)
    });
    $("#loginChangeButton").click(function () {
        $(".inputNewContainer").animate({fontSize:'0px'})
        $(".inputNewContainer").animate({height:'0px'})
        $(".inputNewContainer").fadeOut(500)
        $("#createButton").animate({fontSize:'0'})
        $("#createButton").animate({height:'0'})
        $("#createButton").fadeOut(500)
        $("#loginText").animate({fontSize:'0px'})
        $("#loginChangeButton").animate({fontSize:'0'})
        $("#loginChangeButton").animate({height:'0'})
        $("#loginChangeButton").fadeOut(500)

        setTimeout(function(){
            $(".inputContainer").fadeIn(200)
            $(".inputContainer").animate({height:'35px'})
            $(".inputContainer").animate({fontSize:'12px'})
            $("#loginButton").fadeIn(200)
            $("#loginButton").animate({height:'45px'})
            $("#loginButton").animate({fontSize:'14px'})
            $("#signUpButton").fadeIn(200)
            $("#signUpButton").animate({height:'45px'})
            $("#signUpButton").animate({fontSize:'14px'})
            $("#newText").animate({fontSize:'10px'})
        },980)
    });
    $("#createButton").click(function () {
        var form = document.getElementById("submitLogin");
        form.submit()
    });

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

    //User Count
    document.getElementById("memberCount").innerText = userCount+" Users have joined!"
});
