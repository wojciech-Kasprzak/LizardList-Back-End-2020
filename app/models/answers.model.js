const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  const AnswersSchema = sequelize.define(
    "Answers",
    {
      Content: {
        type: Sequelize.STRING,
      },
      QuestionId: {
        type: Sequelize.INTEGER,
      },
      // VariantAnswersId: {
      //   type: Sequelize.INTEGER,
      // },
      VariantAnswerId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      // options
      timestamps: false,
    }
  );
  return AnswersSchema;
};
