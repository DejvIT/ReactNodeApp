const db = require('../models');
const Reservation = db.reservation;
const User = db.user;
const Machine = db.machine;
const sequelize = require('sequelize');
const mailer = require('../mailer');

exports.create = (req, res) => {
  const message = emptyValidate(req.body);
  if (message.length > 0) {
    res.status(400).send({
      message: message
    });
    return;
  }

  const reservation = {
    user_id: req.body.user_id,
    machine_id: req.body.machine_id,
    note: req.body.note,
    start: req.body.start,
    end: req.body.end,
    all_day: req.body.allDay
  }

  Reservation.create(reservation).then(data => {
    // zakomentovano pada pri rychlem vytvareni rezervaci
    // mailer.createReservation(data);
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Vyskytl se problém při vytváření rezervace."
    });
  })
}

exports.update = (req, res) => {
  const id = req.params.id;

  Reservation.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Reservation was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Reservation with id=${id}. Maybe Reservation was not found or req.body is empty!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating Reservation with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Reservation.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Reservation was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Reservation with id=${id}. Maybe Reservation was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};


exports.getAllByUserId = (req, res) => {
  const userId = req.params.id;
  const withoutDeleted = !req.query.deleted || req.query.deleted === "false";
  const where = {};
  if (!req.query.users || req.query.users === "me") {
    where.user_id = userId
  }
  if (!req.query.time || req.query.time === 'upcoming') {
    where.start = { [sequelize.Op.gte]: new Date() }
  }
  Reservation.findAll({
    order: [['updatedAt', 'DESC']],
    where: where,
    include: [{
      model: User,
      attributes: ['id', 'username', 'email'],
    },
    {
      model: Machine,
    }],
    paranoid: withoutDeleted,
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Vyskytl se problém při načítání rezervací."
    });
  })
}

exports.getAllByMachineId = (req, res) => {
  const machineId = req.params.id;
  Reservation.findAll({
    where: { machine_id: machineId },
    include: User,
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Vyskytl se problém při načítání rezervací."
    });
  })
}

function emptyValidate(body) {
  const message = [];
  if (!body.user_id) {
    message.push("Pro rezervaci je nutný přihlášený uživatel!")
  }
  if (!body.machine_id) {
    message.push("Pro rezervaci je nutné vybrat stroj!")
  }
  if (!body.start) {
    message.push("Není určen začátek rezervace!")
  }
  if (!body.end) {
    message.push("Není určen konec rezervace!")
  }

  return message;
}
