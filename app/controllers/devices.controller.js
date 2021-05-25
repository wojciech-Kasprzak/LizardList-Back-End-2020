module.exports = function (io, sequelize) {
  const crypto = require("crypto");

  // const Polls = require("../models/polls.model.js")(sequelize);
  const tables = require("../models/index.js")(sequelize);

  // console.log(tables.Devices);

  var functionsObj = {};
  // const _io = io;

  functionsObj.findAll = (req, res) => {
    tables.Devices.findAll()
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
    tables.Devices.findByPk(req.params.deviceID)
      .then((data) => {
        res.send(data.get());
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes.",
        });
      });
  };

  functionsObj.changeStatus = (req, res) => {
    tables.Devices.update(
      { State: req.body.state },
      { where: { id: req.params.deviceID } }
    )
      .then((data) => {
        console.log(data);
        //websockets
        io.emit(req.params.deviceID, { state: req.body.state });
        return res.status(200).send({
          message: "Lamp's status has been changed",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Lamp.",
        });
      });
  };

  // functionsObj.update = (req, res) => {

  //   tables.Polls.update(
  //     { Active: req.body.Active },
  //     { where: { id: req.params.id } }
  //   )
  //     .then((data) => {
  //       if (req.body.Active == 1) {
  //         return res.status(200).send({
  //           message: "Poll has been activated",
  //         });
  //       } else {
  //         return res.status(200).send({
  //           message: "Poll has been deactivated",
  //         });
  //       }

  //       // Wysyła WebSocket
  //       // io.emit(req.params.pollID, {
  //       //   name: lamp.name,
  //       //   status: lamp.status,
  //       // });
  //       res.send(data);
  //     })
  //     .catch((err) => {
  //       return res.status(500).send({
  //         message: "Error updating note with id " + req.params.pollID,
  //       });
  //     });
  // };

  // functionsObj.create = (req, res) => {
  //   let datetime = new Date().toISOString().slice(0, 19).replace("T", " ");

  //   tables.Devices.create({
  //     Date_created: datetime,
  //   })
  //     .then((data) => {
  //       res.send(data);
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while creating the Lamp.",
  //       });
  //     });
  // };

  return functionsObj;
};
