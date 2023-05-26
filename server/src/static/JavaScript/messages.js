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

    chatLobbiesList = JSON.parse(document.getElementById("chatLobbies").innerText.replaceAll("'",'"'));
    chatMessagesList = JSON.parse(document.getElementById("chatMessages").innerText.replaceAll("'",'"'));
    globalIndex = chatLobbiesList.indexOf('global')
    globalChatMessages = (chatMessagesList[globalIndex].split("-"))

    for (let i = 0; i < globalChatMessages.length-1; i++) {
        chatLogsBox = document.getElementById("chatLogsBox")
        const messages = document.createElement('div'); 
        messages.classList.add("messages");
        messages.setAttribute("id",chatLobby)
        const messageText = document.createElement('p'); 
        messageText.innerText = globalChatMessages[i];
        messages.appendChild(messageText);
        chatLogsBox.appendChild(messages);
    }
      

    chatBox = document.getElementById("chatBox")
    for (let i = 0; i < chatLobbiesList.length; i++) {
        if(chatLobbiesList[i] !="global"){
            const privateChatLogsBox = document.createElement('div');
            privateChatLogsBox.classList.add("privateChatLogsBox");
            privateChatLogsBox.setAttribute("id", chatLobbiesList[i])
            chatBox.appendChild(privateChatLogsBox)
        }
    }






})


var chatSwitch = false
function chatFriendsList(){
    
    if(chatSwitch === false){
        $("#chatFriendsList").animate({bottom:"24px"});
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
    username = document.getElementById("usernameText").innerText
    arr = [friend.replace("$message$",""), username]
    arr.sort()
    chatLobby = arr[0]+"-"+arr[1]

    chatLobbiesList = JSON.parse(document.getElementById("chatLobbies").innerText.replaceAll("'",'"'));
    chatMessagesList = JSON.parse(document.getElementById("chatMessages").innerText.replaceAll("'",'"'));
    chatLogIndex = chatLobbiesList.indexOf(chatLobby)
    privateChatMessages = (chatMessagesList[chatLogIndex].split("-"))
    chatLogsBox = document.getElementById(chatLobby)

    for (let i = 0; i < privateChatMessages.length-1; i++) {
        const messages = document.createElement('div'); 
        messages.classList.add("messages");
        messages.setAttribute("id",chatLobby)
        const messageText = document.createElement('p'); 
        messageText.innerText = privateChatMessages[i];
        messages.appendChild(messageText);
        chatLogsBox.appendChild(messages);
    }



    // Loop through each element and log their IDs
    const privateBox = document.querySelectorAll('.privateChatLogsBox');

    // Loop through each element using a for loop
    for (let i = 0; i < privateBox.length; i++) {
      const element = privateBox[i];
      elementID = element.id;

      if(elementID==chatLobby){
        document.getElementById(elementID).style.display = "block"
      }
      else{
        document.getElementById(elementID).style.display = "none"

      }
      
    }


}

function globalChatClicked(){
    chatLobby = 'global'
    document.getElementById("usernameTitle").innerText = "Global Chat"

    
    const privateLogs = document.querySelectorAll('.privateChatLogsBox');
    privateLogs.forEach(function(privateLogs) {
        privateLogs.style.display = 'none';
      });
}


$(function(){
    $('#submitMessage').on('click', function() {
        username = document.getElementById("usernameText").innerText
        message = document.getElementById("messageInput").value
 
        // alert(chatLobby)
        $.post("/message", {'username':username, 'message':message, "chatLobby": chatLobby}, function(){
        });


    })

    friendsList = (document.getElementById("friendsList").innerText).split("-");    
    username = document.getElementById("usernameText").innerText
    var pusher = new Pusher('8a526bc7ea075b1655a8', {
        cluster: 'us3'
        });


    for (let i = 0; i < friendsList.length-1; i++) {
        arr = [friendsList[i], username]
        arr.sort()
        chatLobby = (arr[0]+"-"+arr[1])

        var channel = pusher.subscribe(chatLobby);
        channel.bind('new-message', function(data) {
            // alert("test")
            let username = data.username;
            let message = data.message;
            chatLogsBox = document.getElementById(chatLobby)
            const messages = document.createElement('div'); 
            messages.classList.add("messages")
            messages.setAttribute("id",chatLobby)
            const messageText = document.createElement('p'); 
            messageText.innerText = username+": "+ message
            messages.appendChild(messageText)
            chatLogsBox.appendChild(messages)
            document.getElementById("messageInput").value = ""
            setTimeout(function(){
                chatLogsBox.scrollTop = chatLogsBox.scrollHeight;
            },100)
        });

    }

    chatLobby ="global"

    var channel = pusher.subscribe('global');
    channel.bind('new-message', function(data) {
        // alert("test")
        let username = data.username;
        let message = data.message;
        chatLogsBox = document.getElementById("chatLogsBox")
        const messages = document.createElement('div');
         
        messages.classList.add("messages");
        messages.setAttribute("id",chatLobby)

        const messageText = document.createElement('p'); 
        messageText.innerText = username+": "+ message;
        messages.appendChild(messageText);
        chatLogsBox.appendChild(messages);
        document.getElementById("messageInput").value = "";
        setTimeout(function(){
            chatLogsBox.scrollTop = chatLogsBox.scrollHeight;
        },100)
    });



    
})
