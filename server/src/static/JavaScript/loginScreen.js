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
    // alert(screen.width)
    var img = new Image();
    img.src = "https://imgtr.ee/images/2023/04/18/0MCrx.png"


    // img.onload = function(){
    //     alert(this.width);
    //   }

    pixelWidthCount = 0
    // count = 0
    // while(pixelWidthCount<screen.width-40){
    //     randomNumber = Math.floor(Math.random() * (11 - 0 + 1)) + 0
    //     newBuilding = buildingArr[randomNumber]
    //     var elem = document.createElement("img");
    //     elem.setAttribute("src", newBuilding);
    //     elem.setAttribute("width", "60");
    //     elem.setAttribute("id","building"+count)
    //     document.getElementById("webBody").appendChild(elem);
    //     document.getElementById("building"+count).style.position = "FIXED";
    //     document.getElementById("building"+count).style.left = pixelWidthCount+"px";

    //     document.getElementById("building"+count).style.top = 500+"px";


    //     pixelWidthCount+=50
    //     count+=1

    //     console.log(pixelWidthCount)
    //     if (pixelWidthCount>screen.width){
    //         break;
    //     }

    // }


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
    },1500)
    
    $("#loginButton").click(function () {
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


});







///////////////JAVASCRIPT



// <!-- https://imgtr.ee/images/2023/04/18/0MZ8m.png
// https://imgtr.ee/images/2023/04/18/0MmrU.png
// https://imgtr.ee/images/2023/04/18/0MdcB.png
// https://imgtr.ee/images/2023/04/18/0M69Q.png
// https://imgtr.ee/images/2023/04/18/0MLQR.png
// https://imgtr.ee/images/2023/04/18/0MNII.png
// https://imgtr.ee/images/2023/04/18/0M5Gb.png
// https://imgtr.ee/images/2023/04/18/0MV17.png
// https://imgtr.ee/images/2023/04/18/0MWVA.png
// https://imgtr.ee/images/2023/04/18/0MAP2.png
// https://imgtr.ee/images/2023/04/18/0M48z.png
// https://imgtr.ee/images/2023/04/18/0MCrx.png -->