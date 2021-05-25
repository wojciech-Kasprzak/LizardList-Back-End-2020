module.exports = function (io, sequelize) {
  // const Polls = require("../models/polls.model.js")(sequelize);

  const tables = require("../models/index.js")(sequelize);

  // console.log(tables.Owners);

  var functionsObj = {};
  // const _io = io;

  functionsObj.findAll = (req, res) => {
    tables.Questions.findAll()
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
    // tables.Polls.findByPk(req.params.id, { include: ["Questions"] })
    tables.Questions.findByPk(req.params.id, { include: ["VariantAnswer"] })
      // tables.Questions.findOne({ where: { id: req.params.id } })
      .then((data) => {
        res.send(data.get());
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes.",
        });
      });
  };

  // functionsObj.findOne = (req, res) => {
  //   tables.Questions.findByPk(req.params.id, { include: ["VariantAnswer"] })
  //   // tables.Questions.findOne({ where: { id: req.params.id } })
  //     .then((data) => {
  //       res.send(data.get());
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: err.message || "Some error occurred while retrieving notes.",
  //       });
  //     });
  // };

  functionsObj.create = (req, res) => {
    // Validate request
    if (!req.body.Content || !req.body.PollId || !req.body.Type_question_ID) {
      return res.status(400).send({
        message: "Parameters can not be empty",
      });
    }

    if (req.body.Type_question_ID == 4 && !req.body.Variants) {
      console.log(req.body.Variants);
      return res.status(400).send({
        message: "Variants can not be empty",
      });
    }

    return sequelize
      .transaction(function (t) {
        return tables.Questions.create(
          {
            Content: req.body.Content,
            PollId: req.body.PollId,
            Type_question_ID: req.body.Type_question_ID,
            Devices_ID: req.body.deviceId,
          },
          { transaction: t }
        ).then(function (data) {
          if (req.body.Variants == undefined) {
            return true;
          }
          let array = [];
          req.body.Variants.forEach((elem) => {
            let obj = {};
            obj.Content = elem;
            obj.QuestionId = data.dataValues.id;
            array.push(obj);
          });
          console.log(array);
          return tables.VariantAnswer.bulkCreate(array, { transaction: t });
        });
      })
      .then(function (result) {
        // console.log(result);
        res.send({
          message: "Question has been add",
        });
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
      })
      .catch(function (err) {
        console.log(err);
        return res.status(400).send({
          message: "Question hasn't been add",
        });
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
      });
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
            // res.send(data);
            res.send({
              message: "Question has been updated",
            });
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
    return sequelize
      .transaction(function (t) {
        return tables.VariantAnswer.destroy(
          {
            where: { QuestionId: req.params.id },
          },
          { transaction: t }
        ).then(function (data) {
          return tables.Answers.destroy(
            { where: { QuestionId: req.params.id } },
            { transaction: t }
          ).then(function (data) {
            return tables.Questions.destroy(
              { where: { id: req.params.id } },
              { transaction: t }
            );
          });
        });
      })
      .then(function (result) {
        console.log(result);
        res.send({
          message: "Question has been deleted",
        });
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
      })
      .catch(function (err) {
        // console.log(err);
        return res.status(400).send({
          message: "Question hasn't been delete",
        });
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
      });

    // tables.Questions.destroy({
    //   where: {
    //     id: req.params.id,
    //   },
    // })
    //   .then(() => {
    //     res.send({ message: "Question deleted successfully!" });
    //   })
    //   .catch((err) => {
    //     return res.status(500).send({
    //       message: "Could not delete question with id " + req.params.id,
    //     });
    //   });
  };

  return functionsObj;
};
