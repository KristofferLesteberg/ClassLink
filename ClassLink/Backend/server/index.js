const http = require('http')
const { WebSocketServer } = require('ws')

const url = require("url")
const uuidv4 = require("uuid").v4

const server = http.createServer()
const wsServer = new WebSocketServer({ server })
const port = 8000


const connections = { }
const users = { }

const broadcast = (data) => {
    const message = JSON.stringify(data)
    Object.values(connections).forEach(connection => {
        connection.send(message)
    })
}

const handleMessage = (bytes, uuid) => {
    const message = JSON.parse(bytes.toString())
    const user = users[uuid]

    const chatMessage = {
        username: user.username.split("@", [1]),
        text: message.text
    }


    
    broadcast({ type: "chat", message: chatMessage })
    console.log(`${user.username}: ${message.text}`)
}

const handleClose = (uuid) => {
    console.log(`${users[uuid].username} disconnected`)

    broadcast({ type: "system", message: `${users[uuid].username.split("@", [1])} left the chat`})
    delete connections[uuid]
    delete users[uuid]
}

wsServer.on("connection", (connection, request) => {
    
     const { username } = url.parse(request.url, true).query
     const uuid = uuidv4()  
     console.log(username)
     console.log(uuid)

     connections[uuid] = connection
     users[uuid] = { username }

     console.log(`${username} connected with id ${uuid}`)

     broadcast({ type: "system", message: `${username.split("@", [1])} joined the chat`})

     connection.on("message", message => handleMessage(message, uuid))
     connection.on("close", () => handleClose(uuid))
})


server.listen(port, () => {
    console.log(`Websocket server is running on port ${port}`)
})

