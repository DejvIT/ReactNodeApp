module.exports = (sequelize, Sequelize) => {
  const MachinePrice = sequelize.define("machine_prices", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    machine_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    length: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  });

  return MachinePrice;
};
