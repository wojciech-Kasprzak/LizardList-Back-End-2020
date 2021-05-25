module.exports = function(io,sequelize){
  const Lamp = require('../models/lamp.model.js')(sequelize);

  var that={};
  // const _io = io;

  that.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
      return res.status(400).send({
        message: "Lamp Name can not be empty"
      });
    }

    Lamp.create({
      name: req.body.name,
      status: req.body.status
    })
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Lamp."
      });
    });;
  };



  that.findAll = (req, res) => {
    Lamp.findAll()
    .then(lamps => {
      res.send(lamps);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });

    //websockets
    // io.emit("message", notes);
  };



  that.findOne = (req, res) => {

    Lamp.findOne({ where: {name: req.params.lampName} })
    .then(note => {
      res.send(note.get());
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
  };



  that.update = (req, res) => {
    // Validate Request
    // if(!req.body.name) {
    //   return res.status(400).send({
    //     message: "Lamp content can not be empty"
    //   });
    // }

    Lamp.findOne({ where: {name: req.params.lampName} })
    .then(lamp => {
      lamp = lamp.get()
      lamp.status = !lamp.status
      Lamp.update(
        {status: lamp.status},
        {where: { name: req.params.lampName }}
      ).then(data => {
        if(!data) {
          return res.status(404).send({
            message: "Lamp not found with name " + req.params.lampName
          });
        }
        // Wysyła WebSocket
        io.emit(req.params.lampName, {name: lamp.name, status: lamp.status});
        res.send(lamp);
      }).catch(err => {
        return res.status(500).send({
          message: "Error updating note with id " + req.params.lampName
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });

  };



  that.delete = (req, res) => {
    Lamp.destroy({
      where: {
        name: req.params.lampName
      }
    }).then(() => {
      res.send({message: "Lamp deleted successfully!"});
    }).catch(err => {
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.lampName
      });
    });;
  };



  return that;
}
