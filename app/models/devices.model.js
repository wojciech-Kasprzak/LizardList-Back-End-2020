const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  const QuestionsSchema = sequelize.define(
    "Devices",
    {
      Name: {
        type: Sequelize.STRING,
      },
      State: {
        type: Sequelize.INTEGER,
      },
      DeviceId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      // options
      timestamps: false,
    }
  );
  return QuestionsSchema;
};
