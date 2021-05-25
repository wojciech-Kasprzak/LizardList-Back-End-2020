const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  const ownersModel = sequelize.define(
    "Owners",
    {
      Date_created: {
        type: Sequelize.DATE,
      },
    },
    {
      // options
      timestamps: false,
    }
  );
  return ownersModel;
};
