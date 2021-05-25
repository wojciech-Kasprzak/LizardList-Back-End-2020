module.exports = function (sequelize) {
  const tabels = {};

  tabels.Polls = require("../models/polls.model.js")(sequelize);
  tabels.Owners = require("../models/owners.model.js")(sequelize);
  tabels.Questions = require("../models/questions.model.js")(sequelize);
  tabels.VariantAnswer = require("../models/variantAnswer.model.js")(sequelize);
  tabels.Answers = require("../models/answers.model.js")(sequelize);
  tabels.Devices = require("../models/devices.model.js")(sequelize);

  tabels.Owners.hasMany(tabels.Polls, { as: "Polls" });
  tabels.Polls.belongsTo(tabels.Owners, {
    foreignKey: "OwnerId",
    as: "Polls",
  });

  tabels.Polls.hasMany(tabels.Questions, { as: "Questions" });
  tabels.Questions.belongsTo(tabels.Polls, {
    foreignKey: "PollId",
    as: "Questions",
  });

  tabels.Questions.hasMany(tabels.VariantAnswer, { as: "VariantAnswer" });
  tabels.VariantAnswer.belongsTo(tabels.Questions, {
    foreignKey: "QuestionId",
    as: "VariantAnswer",
  });

  tabels.Questions.hasOne(tabels.Devices, { as: "Devices" });
  // tabels.Devices.belongsTo(tabels.Questions, {
  //   foreignKey: "QuestionId",
  //   as: "Devices",
  // });

  tabels.Questions.hasMany(tabels.Answers, { as: "Answers" });
  tabels.Answers.belongsTo(tabels.Questions, {
    foreignKey: "QuestionId",
    as: "Answers",
  });

  tabels.VariantAnswer.hasMany(tabels.Answers, { as: "Answers" });
  tabels.Answers.belongsTo(tabels.VariantAnswer, {
    foreignKey: "VariantAnswerId",
    as: "VariantAnswer",
  });

  return tabels;
};
