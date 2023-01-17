module.exports = (sequelize, Sequelize) => {
  const Reservation = sequelize.define("reservations", {
    user_id: {
      type: Sequelize.INTEGER
    },
    machine_id: {
      type: Sequelize.INTEGER
    },
    invoice_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    note: {
      type: Sequelize.STRING
    },
    start: {
      type: Sequelize.DATE
    },
    end: {
      type: Sequelize.DATE
    },
    all_day: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  }, {
    paranoid: true,
  });

  return Reservation;
};