chatLobby = "global"

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

    // const chatBox = document.createElement('div');
    // chatBox.setAttribute("id", "chatBox")
    // chatBox.classList.add("chatBox");
    // const lining = document.createElement('div');
    // lining.classList.add("lining");

    // chatBox.appendChild(lining)

    // messagingBox.appendChild(chatBox)
      
})


var chatSwitch = false
function chatFriendsList(){
    
    if(chatSwitch === false){
        $("#chatFriendsList").animate({bottom:"20px"});
        chatSwitch = true
        $("#chatBox").animate({bottom:"510px"});
    }
    else{
        $("#chatFriendsList").animate({bottom:"-160px"});
        chatSwitch = false
        $("#chatBox").animate({bottom:"0px"});
    }
}

function clickedFriend(friend){
    chatBox = document.getElementById("chatBox")
    const friendMessagingBox = document.createElement('button');
    friendMessagingBox.setAttribute("id", friend)
    friendMessagingBox.setAttribute("onclick", "clickToViewMessages(this.id)")
    friendMessagingBox.classList.add("friendMessagingBox");
    const friendBoxName = document.createElement('p');
    friendBoxName.innerText = friend.replace("$message$","");
    friendMessagingBox.appendChild(friendBoxName)
    chatBox.appendChild(friendMessagingBox)

}


function clickToViewMessages(friend){
    chatBox = document.getElementById("chatBox");
    document.getElementById("usernameTitle").innerText = friend.replace("$message$", "");
    // alert(friend)

    username = document.getElementById("usernameText").innerText
    arr = [friend.replace("$message$",""), username]
    arr.sort()

    username = document.getElementById("usernameText").innerText
    chatLobby = arr[0]+"-"+arr[1]
    // alert(chatLobby)
}

// count =0
// function sendMessage(){
//     message = document.getElementById("messageInput").value
//     chatLogsBox = document.getElementById("chatLogsBox")
//     // const messages = document.createElement('div'); 
//     // messages.classList.add("messages")

//     // const messageText = document.createElement('p'); 
//     // messageText.innerText = message
//     // messages.appendChild(messageText)
//     // chatLogsBox.appendChild(messages)
    
//     document.getElementById("messageInput").value = ""

//     username = document.getElementById("usernameText").innerText

//     $.post("/message", {'username':username, 'message':message}, function(){
//     });
//     var pusher = new Pusher('8a526bc7ea075b1655a8', {
//         cluster: 'us3'
//       });

//       var channel = pusher.subscribe('chat-channel');
//       channel.bind('new-message', function(data) {
//         let username = data.username
//         let message = data.message
//         // const messages = document.createElement('div'); 
//         // messages.classList.add("messages")
//         // const messageText = document.createElement('p'); 
//         // messageText.innerText = message
//         // messages.appendChild(messageText)
//         // chatLogsBox.appendChild(messages)
//         let message_template = `
//             <div class = "messages">
//                 <p>${message}<p>
//             </div>
        
//         `;
//         $('#chatLogsBox').append(message_template);

//       });

// }





$(function(){

    $('#submitMessage').on('click', function() {
        username = document.getElementById("usernameText").innerText
        message = document.getElementById("messageInput").value
        // alert(chatLobby)
        $.post("/message", {'username':username, 'message':message, "chatLobby": chatLobby}, function(){
        });

    })




    var pusher = new Pusher('8a526bc7ea075b1655a8', {
    cluster: 'us3'
    });
    // alert(chatLobby)
    var channel = pusher.subscribe(chatLobby);
    channel.bind('new-message', function(data) {
        alert("test")
        let username = data.username;
        let message = data.message;
        chatLogsBox = document.getElementById("chatLogsBox")
        const messages = document.createElement('div'); 
        messages.classList.add("messages")
        const messageText = document.createElement('p'); 
        messageText.innerText = username+": "+ message
        messages.appendChild(messageText)
        chatLogsBox.appendChild(messages)
        document.getElementById("messageInput").value = ""
    });
    
})
