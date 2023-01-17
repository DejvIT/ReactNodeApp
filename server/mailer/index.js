const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "606a57ad6aed85",
    pass: "ec3f08f7e916d0"
  }
});

exports.createTicket = (req, res) => {
  let mailOptionsSupport = {
    from: '"' + req.name + '" <' + req.email + '>',
    to: 'support@microbagr.tech',
    subject: 'Zpráva z kontaktního formuláře - ' + req.subject,
    text: req.content,
    html: '<table>' +
      '<tr><th>Name:</th><td>' + req.name + '</td></tr>' +
      '<tr><th>Email:</th><td>' + req.email + '</td></tr>' +
      '<tr><th>Subject:</th><td>' + req.subject + '</td></tr>' +
      '</table>' +
      '<p>' + req.content + '</p>',
  };
  let mailOptionsDispatcher = {
    from: '"Support team" <support@microbagr.tech>',
    to: req.email,
    subject: 'Přijali jsme vaši zprávu!',
    text: 'Děkujeme vám za zprávu, jakmile to bude možné náš tým ji začne vyřizovat a spojí se s vámi.',
    html: '<p>Děkujeme vám za zprávu, jakmile to bude možné náš tým ji začne vyřizovat a spojí se s vámi.</p>',
  };
  transporter.sendMail(mailOptionsSupport, (error, info) => {
    if (error) {
      res.status(500).send({ message: error.message });
    }
    console.log('Message sent: %s', info.messageId);
  });
  transporter.sendMail(mailOptionsDispatcher, (error, info) => {
    if (error) {
      res.status(500).send({ message: error.message });
    }
    console.log('Message sent: %s', info.messageId);
  });
}

exports.createReservation = (req, res) => {
  let mailOptionsSupport = {
    from: '"Tonda Tester" <tonda@tester.cz>',
    to: 'support@microbagr.tech',
    subject: 'Rezervace vytvořena',
    text: 'Nová rezervace v termínu: ' +
      req.start.getDate() + '.' +
      req.start.getMonth() + '.' +
      req.start.getUTCFullYear() + ' až ' +
      req.end.getDate() + '.' +
      req.end.getMonth() + '.' +
      req.end.getUTCFullYear() + '.',
    html:
      '<p>Nová rezervace v termínu: ' + req.start.getDate() + '.' +
      req.start.getMonth() + '.' +
      req.start.getUTCFullYear() + ' až ' +
      req.end.getDate() + '.' +
      req.end.getMonth() + '.' +
      req.end.getUTCFullYear() + '.</p>',
  };
  let mailOptionsDispatcher = {
    from: '"Support team" <support@microbagr.tech>',
    to: 'tonda@tester.cz',
    subject: 'Přijali jsme vaši zprávu!',
    text: 'Vaše rezervace v termínu: ' +
      req.start.getDate() + '.' +
      req.start.getMonth() + '.' +
      req.start.getUTCFullYear() + ' až ' +
      req.end.getDate() + '.' +
      req.end.getMonth() + '.' +
      req.end.getUTCFullYear() +
      ' je potvrzena. Veškeré detaily k objednávce naleznete na vašem profilu.',
    html:
      '<p>Vaše rezervace v termínu: ' + req.start.getDate() + '.' +
      req.start.getMonth() + '.' +
      req.start.getUTCFullYear() + ' až ' +
      req.end.getDate() + '.' +
      req.end.getMonth() + '.' +
      req.end.getUTCFullYear() +
      ' je potvrzena. Veškeré detaily k objednávce naleznete na vašem profilu.</p>',
  };
  transporter.sendMail(mailOptionsSupport, (error, info) => {
    if (error) {
      console.log(error)
      res.status(500).send({ message: error.message });
    }
    console.log('Message sent: %s', info.messageId);
  });
  transporter.sendMail(mailOptionsDispatcher, (error, info) => {
    if (error) {
      console.log(error)
      res.status(500).send({ message: error.message });
    }
    console.log('Message sent: %s', info.messageId);
  });
}

exports.newUser = (req, res) => {
  let mailOptionsSupport = {
    from: '"' + req.username + '" <' + req.email + '>',
    to: 'support@microbagr.tech',
    subject: '',
    text: 'Nová registrace z ' + req.email,
    html: '<table>' +
        '<tr><th>Name:</th><td>' + req.name + '</td></tr>' +
        '<tr><th>Email:</th><td>' + req.email + '</td></tr>',
  };
  console.log(mailOptionsSupport);
  let mailOptionsDispatcher = {
    from: '"Support team" <support@microbagr.tech>',
    to: req.email,
    subject: 'Nová registrace!',
    text: 'Děkujeme za registraci.',
    html: '<p>Děkujeme za registraci.</p>',
  };
  console.log(mailOptionsDispatcher);
  transporter.sendMail(mailOptionsSupport, (error, info) => {
    if (error) {
      res.status(500).send({ message: error.message });
    }
    console.log('Message sent: %s', info.messageId);
  });
  transporter.sendMail(mailOptionsDispatcher, (error, info) => {
    if (error) {
      res.status(500).send({ message: error.message });
    }
    console.log('Message sent: %s', info.messageId);
  });
}
