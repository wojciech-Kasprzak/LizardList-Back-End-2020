module.exports = function (io, sequelize) {
  // const Polls = require("../models/polls.model.js")(sequelize);

  const tables = require("../models/index.js")(sequelize);

  // console.log(tables.Owners);

  var functionsObj = {};
  // const _io = io;

  functionsObj.findAll = (req, res) => {
    tables.Polls.findAll()
      .then((lamps) => {
        res.send(lamps);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes.",
        });
      });
  };


  functionsObj.findOne = (req, res) => {
    tables.Polls.findByPk(req.params.id, {
      include: [{
        model: tables.Questions,
        as: 'Questions',
        include: [{
          model: tables.VariantAnswer,
          as: 'VariantAnswer',
        }]
      }]
    })
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
    // Validate request
    if (!req.body.Name || !req.body.OwnerId) {
      return res.status(400).send({
        message: "Name and OwnerId can not be empty",
      });
    }

    tables.Polls.create({
      Name: req.body.Name,
      Active: 0,
      OwnerId: req.body.OwnerId,
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

  functionsObj.update = (req, res) => {
    // Validate Request
    if (!req.body.Active && req.body.Active != 0) {
      return res.status(400).send({
        message: "Active content can not be empty"
      });
    }

    tables.Polls.update(
      { Active: req.body.Active },
      { where: { id: req.params.id } }
    )
      .then((data) => {
        if (req.body.Active == 1) {
          return res.status(200).send({
            message: "Poll has been activated",
          });
        } else {
          return res.status(200).send({
            message: "Poll has been deactivated",
          });
        }
  
        // Wysyła WebSocket
        // io.emit(req.params.pollID, {
        //   name: lamp.name,
        //   status: lamp.status,
        // });
        res.send(data);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error updating note with id " + req.params.pollID,
        });
      });
  };

  functionsObj.delete = (req, res) => {
    Polls.destroy({
      where: {
        name: req.params.pollID,
      },
    })
      .then(() => {
        res.send({ message: "Lamp deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete note with id " + req.params.pollID,
        });
      });
  };

  return functionsObj;
};
