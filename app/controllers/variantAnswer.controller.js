module.exports = function (io, sequelize) {
  // const Polls = require("../models/polls.model.js")(sequelize);

  const tables = require("../models/index.js")(sequelize);

  // console.log(tables.Owners);

  var functionsObj = {};
  // const _io = io;

  functionsObj.findAll = (req, res) => {
    tables.VariantAnswer.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Questions.",
        });
      });
  };

  functionsObj.findOne = (req, res) => {
    tables.Questions.findOne({ where: { id: req.params.id } })
      .then((data) => {
        res.send(data.get());
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes.",
        });
      });
  };

  functionsObj.test = (req, res, ccc) => {
    console.log(ccc);
    tables.Questions.findAll()
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      // .catch((err) => {
      //   res.status(500).send({
      //     message:
      //       err.message || "Some error occurred while retrieving Questions.",
      //   });
      // });
  }

  functionsObj.create = (req, res) => {
    // Validate request
    if (!req.body.Content || !req.body.PollId || !req.body.Type_question_ID) {
      return res.status(400).send({
        message: "Parameters can not be empty",
      });
    }

    if (req.body.Type_question_ID == 4 && !req.body.Variants) {
      return res.status(400).send({
        message: "Variants can not be empty",
      });
    }

    let id;
    tables.Questions.create({
      Content: req.body.Content,
      PollId: req.body.PollId,
      Type_question_ID: req.body.Type_question_ID,
    })
      .then((data) => {
        res.send(data);
        id = data.dataValues.id;
        console.log(functionsObj.test(data.dataValues.id));
        // tables.VariantAnswer.create({id: 1, Content: "ccc", Questions_ID: 1 })
        //   .then((dataVariantAnswer) => {
        //     res.send(dataVariantAnswer);
        //   })
        //   .catch((err) => {
        //     res.status(500).send({
        //       message:
        //         err.message || "Some error occurred while creating the Lamp.",
        //     });
        //   });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Lamp.",
        });
      });
      
    console.log(id);
    // req.body.Variants.forEach((elem) => {
    //   elem.Questions_ID = data.dataValues.id;
    // });
    // tables.VariantAnswer.bulkCreate(req.body.Variants)
    //   .then((dataVariantAnswer) => {
    //     res.send(dataVariantAnswer);
    //   })
    //   .catch((err) => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the Lamp.",
    //     });
    //   });
  };

  functionsObj.update = (req, res) => {
    // Validate Request
    tables.Questions.findOne({ where: { id: req.params.id } })
      .then((data) => {
        data = data.get();
        tables.Questions.update(
          {
            Content: req.body.Content,
            PollId: req.body.PollId,
            Type_question_ID: req.body.Type_question_ID,
          },
          { where: { id: req.params.id } }
        )
          .then((data) => {
            res.send(data);
            // Wysyła WebSocket
            // io.emit(req.params.id, {
            //   name: lamp.name,
            //   status: lamp.status,
            // });
          })
          .catch((err) => {
            return res.status(500).send({
              message: "Error updating note with id " + req.params.id,
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes.",
        });
      });
  };

  functionsObj.delete = (req, res) => {
    tables.Questions.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.send({ message: "Question deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete note with id " + req.params.id,
        });
      });
  };

  return functionsObj;
};
