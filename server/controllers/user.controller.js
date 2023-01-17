const db = require('../models')
const User = db.user;

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
}

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Uživatel byl úspěšně aktualizován."
        });
      } else {
        res.send({
          message: `Nastal problém při aktualizaci uživatele s id=${id}. Je možné, že uživatel neexistuje nebo se poslal špatný požadavek!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nastal problém při aktualizaci uživatele id=" + id
      });
    });
};

exports.getAll = (req, res) => {
  User.findAll({
    attributes: ['username', 'email']
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Vyskytl se problém při načítání uživatelů."
    });
  })
}

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
