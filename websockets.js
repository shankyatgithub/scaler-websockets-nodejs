const express = require("express")
const http = require("http")
const { sourceMapsEnabled } = require("process")
const {Server} = require("socket.io")
const serverPort = 3200
const serverName = "shanksserver"

const app = express()
app.use(express.static("public"))

const server = http.createServer(app)
const io = new Server(server)
let chatGroup

io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`)

    //console.log(socket);

    //socket.emit(`${serverName}`, `Hi ${socket.client.id} - welcome to ${serverName} - ${Date.now()}`)

    socket.on("new_message", (clientMesssage) => {
        console.log(clientMesssage)
        //let messageObject = JSON.parse(clientMesssage)
        //if (!sourceMapsEnabled) delete messageObject["map"]
        socket.broadcast.emit("broadcast_message", clientMesssage)
    })

    socket.on("createChatGroup", (roomid) => {
        chatGroup = roomid
        socket.join(chatGroup)
        console.log(`chatgroup - ${chatGroup} created`);
    })

    socket.on("joinChatGroup", () => {
        if(!chatGroup){
            return socket.emit("error","You must first create a Chat Group!")
        }else{
            socket.join(chatGroup)
            console.log(`${socket.id} joined ${chatGroup}`);
        }
    })

    socket.on("group_message", (group_message) => {
        console.log(chatGroup);
        if(!chatGroup) {
            return socket.emit("error","You must first create a Chat Group!")
        } else {
            socket.to(chatGroup).emit("group_broadcast",group_message)
            console.log(`${socket.id} says - ${group_message}`);
        }
    })

    socket.on("disconnect", () => {
        console.log(`Disconnected: ${socket.id}`)
    })
})

// app.get("/", (req,res) => {
//     res.send("<h1>Hello World!</h1>")
// })

server.listen(serverPort, () => {console.log(`server started on port ${serverPort}`)})

