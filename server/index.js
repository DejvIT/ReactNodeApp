const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

// for production mode
const db = require("./models");
db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application api." });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/ticket.routes')(app);
require('./routes/reservation.routes')(app);
require('./routes/machine.routes')(app);
require('./routes/chat.routes')(app);

io.on('connection', (socket) => {
  console.log('socket connected');
  require('./sockets/chatbot')(socket)
});

// set port, listen for requests
http.listen(8080, function(){
  console.log('listening on *:8080');
});
