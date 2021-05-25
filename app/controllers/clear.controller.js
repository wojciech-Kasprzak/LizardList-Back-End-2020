module.exports = function (io, sequelize) {
  // const Polls = require("../models/polls.model.js")(sequelize);

  // const tables = require("../models/index.js")(sequelize);

  // console.log(tables.Owners);

  var functionsObj = {};

  functionsObj.clearTables = (req, res) => {

    return sequelize.transaction(function (t) {
      return sequelize.query('DELETE FROM`LizardList`.`Answers`;', { transaction: t }).then(function (data) {
        return sequelize.query('ALTER TABLE`LizardList`.`Answers` AUTO_INCREMENT = 1;', { transaction: t }).then(function (data) {
          return sequelize.query('DELETE FROM`LizardList`.`Variant_answers`;', { transaction: t }).then(function (data) {
            return sequelize.query('ALTER TABLE`LizardList`.`Variant_answers` AUTO_INCREMENT = 1;', { transaction: t }).then(function (data) {
              return sequelize.query('DELETE FROM`LizardList`.`Questions`;', { transaction: t }).then(function (data) {
                return sequelize.query('ALTER TABLE`LizardList`.`Questions` AUTO_INCREMENT = 1;', { transaction: t }).then(function (data) {
                  return sequelize.query('DELETE FROM`LizardList`.`Polls`;', { transaction: t }).then(function (data) {
                    return sequelize.query('ALTER TABLE`LizardList`.`Polls` AUTO_INCREMENT = 1;', { transaction: t })
                  })
                })
              })
            })
          })
        })
      });
    }).then(function (result) {
      res.send({
        message: "Tables has been cleared",
      });

    }).catch(function (err) {
      return res.status(400).send({
        message: "Tables hasn't been cleared",
      });

    });

    // DELETE FROM`LizardList`.`Answers`;
    // ALTER TABLE`LizardList`.`Answers` AUTO_INCREMENT = 1;

    // DELETE FROM`LizardList`.`Variant_answers`;
    // ALTER TABLE`LizardList`.`Variant_answers` AUTO_INCREMENT = 1;

    // DELETE FROM`LizardList`.`Questions`;
    // ALTER TABLE`LizardList`.`Questions` AUTO_INCREMENT = 1;

    // DELETE FROM`LizardList`.`Polls`;
    // ALTER TABLE`LizardList`.`Polls` AUTO_INCREMENT = 1;
  };

  return functionsObj;
};
