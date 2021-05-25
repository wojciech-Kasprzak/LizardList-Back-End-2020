const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  const VariantAnswerSchema = sequelize.define(
    "Variant_answer",
    {
      Content: {
        type: Sequelize.STRING,
      },
      QuestionId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      // options
      timestamps: false,
    }
  );
  return VariantAnswerSchema;
};
