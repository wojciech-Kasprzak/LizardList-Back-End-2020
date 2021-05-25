const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  const QuestionsSchema = sequelize.define(
    "Questions",
    {
      Content: {
        type: Sequelize.STRING,
      },
      PollId: {
        type: Sequelize.INTEGER,
      },
      Type_question_ID: {
        type: Sequelize.INTEGER,
      },
      Devices_ID: {
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
