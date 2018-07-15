const http = require('http');
const app = require('./backendserver/app')


const server = http.createServer(app);

server.listen(3000, ()=>{console.log("Server is running at port 3000")})