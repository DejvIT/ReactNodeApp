module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define("chats", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    respondent_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    message: {
      type: Sequelize.TEXT
    },
  }, {
    paranoid: true,
  });

  return Chat;
}