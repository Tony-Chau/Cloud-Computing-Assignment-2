const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const twitterRouter = require('./router/mainroute.js');
const socket = require('socket.io');
var server = app.listen(3000, message);
const io = socket(server);
io.sockets.on('connection', newConnection);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(twitterRouter);

app.use(express.static(path.join(__dirname, 'public')));


function message(){
  console.log("Express app listening at http://localhost:3000/");
}

function newConnection(socket){
  console.log(socket);
}