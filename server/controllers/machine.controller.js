const db = require('../models');
const Machine = db.machine;
const MachinePrice = db.machinePrice;
const Reservation = db.reservation;
const { Op } = require("sequelize");

exports.getAll = (req, res) => {
  Machine.findAll({
    include: [{
      model: MachinePrice,
    }]
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "SELECT: Vyskytla sa chyba."
    });
  })
}

exports.filter = (req, res) => {
  const data = req.body;

  // TODO za boha neviem znegovat include Reservation na not include... teraz najde prave tie co rezervacie v tom obdobi maju nie naopak
  Machine.findAll({
    include: [{
      model: MachinePrice,
    },{
      model: Reservation,
      where: {
        [Op.or]: [{
          start: {
            [Op.between]: [data.from, data.to],
          }
        }, {
          end: {
            [Op.between]: [data.from, data.to],
          }
        }],
      },
    }],
  }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Machines with filter"
      });
    });
}

exports.getAllByUrl = (req, res) => {
  const url = req.params.url;

  Machine.findAll({
    where: { url: url },
    include: [{
      model: MachinePrice,
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Machine with url=" + url
      });
    });
}

exports.bulkUpdate = (req, res) => {
  const items = req.body;

  items.forEach(item => {
    Machine.update(item, {
      where: { id: item.id }
    }).catch(() => {
      res.status(500).send({
        message: "Error updating Machine with id = " + item.id
      });
    });

    item.machine_prices.forEach(price => {
      MachinePrice.update(price, {
        where: { id: price.id }
      }).catch(() => {
        res.status(500).send({
          message: "Error updating machine with id = " + price.id
        });
      });
    });
  });

  res.send({
    message: "Data have been updated successfully!"
  });
};
