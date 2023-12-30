const socket = io()
const btnSend = document.getElementById("btnSend")
const sendMessage = document.getElementById("sendMessage")
const ul = document.getElementById("list")
const createGroup = document.getElementById("createGroup")
const joinGroup = document.getElementById("joinGroup")
const sendMsgToGroup = document.getElementById("sendMsgToGroup")


btnSend.addEventListener("click", () => {
    let message = sendMessage.value;
    const div = document.createElement("div")
    div.setAttribute("class","sender")
    const li = document.createElement("li")
    li.innerText = message
    const para = document.createElement("p")
    para.innerText = "sender"
    div.appendChild(para)
    div.appendChild(li)
    ul.appendChild(div)

    if (message) {
        socket.emit('new_message', message);
        sendMessage.value = "";
    } else {
        alert("Please enter a message");
    };
});

socket.on("broadcast_message", (broadcastMessage) => {
    console.log(`broadcasted-message from server ${broadcastMessage}`);
    const div = document.createElement("div")
    div.className = "message"
    div.setAttribute("class","receiver")
    const li = document.createElement("li")
    li.innerText = broadcastMessage
    const para = document.createElement("p")
    para.innerText = "receiver"
    div.appendChild(para)
    div.appendChild(li)
    ul.appendChild(div)
})

createGroup.addEventListener("click", () => {
    socket.emit("createChatGroup", Math.floor(Math.random(0,1)*1000))
})

joinGroup.addEventListener("click", () => {
    socket.emit("joinChatGroup")
})

sendMsgToGroup.addEventListener("click", () => {
    let message = sendMessage.value;
    

    if (message) {
        socket.emit('group_message', message);

        //socket.on("error", (errorMessage) => {
        //    if(errorMessage) {
        //        alert(errorMessage)
        //    } else {
                //alert("Message sent successfully.")
                const div = document.createElement("div")
                div.setAttribute("class","sender")
                const li = document.createElement("li")
                li.innerText = message
                const para = document.createElement("p")
                para.innerText = "sender"
                div.appendChild(para)
                div.appendChild(li)
                ul.appendChild(div)

                sendMessage.value = ""; 
        //    }
        //})
    } else {
        alert("Please enter a message");
    };
})

socket.on("group_broadcast", (group_message) => {
    console.log(`broadcasted-message from server ${group_message}`);
    const div = document.createElement("div")
    div.className = "message"
    div.setAttribute("class","receiver")
    const li = document.createElement("li")
    li.innerText = group_message
    const para = document.createElement("p")
    para.innerText = "receiver"
    div.appendChild(para)
    div.appendChild(li)
    ul.appendChild(div)
})

// socket.on("shanksserver",(message) => {
//     console.log(`Message received: ${message}`)
// })
