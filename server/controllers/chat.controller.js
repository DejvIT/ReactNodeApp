const db = require('../models');
const Chat = db.chat;
const User = db.user;
const sequelize = require('sequelize');
const mailer = require('../mailer');

exports.getAllByUserId = (req, res) => {
  const userId = req.params.id;
  const where = {};
  where.user_id = userId
  Chat.findAll({
    order: [['updatedAt', 'ASC']],
    where: where,
    include: [{
      model: User,
      attributes: ['id', 'username', 'email'],
    }],
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Vyskytl se problém při načítání konverzace."
    });
  })

}