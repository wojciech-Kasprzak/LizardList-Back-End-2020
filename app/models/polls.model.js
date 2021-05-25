const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  const PollsSchema = sequelize.define(
    "Polls",
    {
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Active: {
        type: Sequelize.INTEGER,
      },
      OwnerId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      // options
      timestamps: false,
    }
  );
  return PollsSchema;
};
