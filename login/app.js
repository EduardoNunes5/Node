const http = require('http');

const reqHandler = require('./routes.js')



const server = http.createServer(reqHandler)

server.listen(3000, 'localhost')
