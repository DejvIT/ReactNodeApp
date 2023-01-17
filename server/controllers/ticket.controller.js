const db = require('../models')
const Ticket = db.ticket;
const mailer = require('../mailer')

exports.create = (req, res) => {
  const message = emptyValidate(req.body);
  if (message.length > 0) {
    res.status(400).send({
      message: message
    });
    return;
  }

  console.log('request body', req.body);

  const ticket = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    content: req.body.content,
    gdpr: req.body.gdpr,
  };

  Ticket.create(ticket).then(data => {
    mailer.createTicket(ticket);
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Ticket."
    });
  })
};

exports.getAll = (req, res) => {
  Ticket.findAll().then(data => {
    console.log(data)
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

function emptyValidate(body) {
  const message = [];
  if (!body.name) {
    message.push("Jméno nemůže být prázdné!")
  }
  if (!body.email) {
    message.push("Email nemůže být prázdný!")
  }
  if (!body.subject) {
    message.push("Předmět nemůže být prázdný!")
  }
  if (!body.content) {
    message.push("Zpráva nemůže být prázdná!")
  }
  if (!body.gdpr) {
    message.push("Musí být potvrzeno zpracování osobních údajů!")
  }

  return message;
}