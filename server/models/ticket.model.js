module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("tickets", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    subject: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
    },
    gdpr: {
      type: Sequelize.BOOLEAN
    }

  });

  return Ticket;
};