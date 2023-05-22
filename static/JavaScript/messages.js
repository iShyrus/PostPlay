

$(document).ready(function(){

    friendsList = (document.getElementById("friendsList").innerText).split("-");    
    chatFriendsListBox = document.getElementById("chatFriendsList") 
    messagingBox = document.getElementById("messagingBox") 

    //Appending friends list in chat box list
    for (let i = 0; i < friendsList.length-1; i++) {
        const friendBox = document.createElement('button');
        friendBox.classList.add("friendBox");
        friendBox.setAttribute("data-search","button"+i);
        friendBox.setAttribute("id", "$message$"+friendsList[i])
        friendBox.setAttribute("onclick", "clickedFriend(this.id)")
        const friendName = document.createElement('p');
        friendName.innerText = friendsList[i]
        friendBox.appendChild(friendName)
        chatFriendsListBox.appendChild(friendBox)
    }

    //Search Bar
    const $searchInput = $("#searchFriendsMessage");
    const $buttons = $(".friendBox");

    $searchInput.on("input", function() {
        const searchValue = $searchInput.val().toLowerCase();
        $buttons.each(function() {
            const buttonText = $(this).text().toLowerCase();
            if (buttonText.includes(searchValue)) {
            $(this).css("display", "block");
            } else {
            $(this).css("display", "none");
        }
      });
    });
      
})


var chatSwitch = false
function chatFriendsList(){
    
    if(chatSwitch === false){
        $("#chatFriendsList").animate({bottom:"20px"});
        chatSwitch = true
    }
    else{
        $("#chatFriendsList").animate({bottom:"-160px"});
        chatSwitch = false
    }
}

function clickedFriend(friend){

    const friendMessagingBox = document.createElement('button'); 
    friendMessagingBox.classList.add("friendMessagingBox");

    const friendBoxName = document.createElement('p');
    friendBoxName.innerText = friend.replace("$message$","");
    friendMessagingBox.appendChild(friendBoxName)

    messagingBox.appendChild(friendMessagingBox)
}

//-160 20