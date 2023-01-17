const db = require('../models');
const Chat = db.chat;

module.exports = function (socket) {
  socket.on('event://send-message', function(msg){
    console.log("zprava z chatu", msg);
    const payload = JSON.parse(msg);
    const data = {
      user_id: payload.userId,
      respondent_id: null,
      message: payload.data.message,
    }
    const message = emptyValidate(data);
    if (message.length > 0) {
      return message;
    }
    Chat.create(data).then(response => {
      socket.broadcast.emit('event://get-message', response);
    }).catch(err => {
      console.log(err);
    })
  });
}

function emptyValidate(body) {
  const message = [];
  if (!body.user_id && !body.respondent_id) {
    message.push("Pro odeslání zprávy je nutný přihlášený uživatel!")
  }
  if (!body.message) {
    message.push("Zpráva je příliš krátká!")
  }

  return message;
}