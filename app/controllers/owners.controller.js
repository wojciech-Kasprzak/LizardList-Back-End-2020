module.exports = function (io, sequelize) {
  const crypto = require("crypto");

  // const Polls = require("../models/polls.model.js")(sequelize);
  const tables = require("../models/index.js")(sequelize);

  // console.log(tables.Owners);

  var functionsObj = {};
  // const _io = io;

  functionsObj.findAll = (req, res) => {
    tables.Owners.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes.",
        });
      });
  };

  functionsObj.findOne = (req, res) => {
    tables.Owners.findByPk(req.params.ownerID, { include: ["Polls"] })
      .then((data) => {
        res.send(data.get());
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes.",
        });
      });
  };

  functionsObj.create = (req, res) => {
    let datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

    tables.Owners.create({
      Date_created: datetime,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Lamp.",
        });
      });
  };

  return functionsObj;
};
