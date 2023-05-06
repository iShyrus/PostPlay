function homeButton(){
    var form = document.getElementById('postLikes');
    var inputValue = document.getElementById("likesDuringThisPage").value;
    var username = document.getElementById("usernameText").innerText


    var previousLikes = document.getElementById("userLikes").innerText

    if (previousLikes === inputValue) {
        window.location.href = "http://127.0.0.1:5000/dashboard/"+username
      } 
    else {
        form.submit()
    }
}

function logOutButton(){
    window.location.href = "http://127.0.0.1:5000/"

}