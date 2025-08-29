const http = require('http')
const {webSocketServer} = require('ws')
const server = http.createServer()

const wsServer = new webSocketServer({ server })
const port = 8000

server.listen(port, () => {
    console.log(`Websocket server is running on port ${port}`)
})

