module.exports = (sequelize, Sequelize) => {
  const Machine = sequelize.define("machines", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER
    },
    deposit: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.TEXT
    },
    mth: {
      type: Sequelize.STRING
    },
    src: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    manufacturer: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    weight: {
      type: Sequelize.STRING
    },
    sizes: {
      type: Sequelize.STRING
    },
    fuel: {
      type: Sequelize.STRING
    },
    engine: {
      type: Sequelize.STRING
    },
    brakes: {
      type: Sequelize.STRING
    },
  });

  return Machine;
};
