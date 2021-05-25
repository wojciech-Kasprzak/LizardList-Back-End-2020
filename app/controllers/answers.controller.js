module.exports = function (io, sequelize) {
  // const Polls = require("../models/polls.model.js")(sequelize);

  const tables = require("../models/index.js")(sequelize);

  // console.log(tables.Owners);

  var functionsObj = {};
  // const _io = io;

  functionsObj.findAll = (req, res) => {
    tables.Answers.findAll()
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

  // functionsObj.findOne = (req, res) => {

  //   // tables.Polls.findByPk(req.params.id, { include: ["Questions"] })
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

  functionsObj.statistics = (req, res) => {
    tables.Polls.findByPk(req.params.id, {
      include: [
        {
          model: tables.Questions,
          as: "Questions",
          include: [
            {
              model: tables.Answers,
              as: "Answers",
              include: [
                {
                  model: tables.VariantAnswer,
                  as: "VariantAnswer",
                },
              ],
            },
          ],
        },
      ],
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

    return sequelize
      .transaction(function (t) {
        let arr = [];
        req.body.forEach((elem) => {
          arr.push(elem.QuestionId);
        });
        return tables.Questions.findAll(
          { where: { id: arr } },
          { transaction: t }
        ).then(function (data) {
          data.forEach((elem) => {
            req.body.forEach((elem2) => {
              if (elem.id == elem2.QuestionId) {
                if (elem.Type_question_ID == 4) {
                  elem2.VariantAnswerId = elem2.VariantAnsferId;
                } else {
                  elem2.Content = elem2.Content;
                }
              }
            });
          });
          return tables.Answers.bulkCreate(req.body, { transaction: t });
        });
      })
      .then(function (result) {
        res.send({
          message: "Answers has been added",
        });
      })
      .catch(function (err) {
        // console.log(err);
        return res.status(400).send({
          message: "Answers hasn't been added",
        });
      });
  };

  // functionsObj.update = (req, res) => {
  //   // Validate Request
  //   tables.Questions.findOne({ where: { id: req.params.id } })
  //     .then((data) => {
  //       data = data.get();
  //       tables.Questions.update(
  //         {
  //           Content: req.body.Content,
  //           PollId: req.body.PollId,
  //           Type_question_ID: req.body.Type_question_ID,
  //         },
  //         { where: { id: req.params.id } }
  //       )
  //         .then((data) => {
  //           res.send(data);
  //           // Wysyła WebSocket
  //           // io.emit(req.params.id, {
  //           //   name: lamp.name,
  //           //   status: lamp.status,
  //           // });
  //         })
  //         .catch((err) => {
  //           return res.status(500).send({
  //             message: "Error updating note with id " + req.params.id,
  //           });
  //         });
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: err.message || "Some error occurred while retrieving notes.",
  //       });
  //     });
  // };

  // functionsObj.delete = (req, res) => {

  //   return sequelize.transaction(function (t) {
  //     return tables.VariantAnswer.destroy({
  //       where: { QuestionId: req.params.id },
  //     }, { transaction: t }).then(function (data) {
  //       return tables.Questions.destroy({ where: { id: req.params.id, }, }, { transaction: t });
  //     });
  //   }).then(function (result) {
  //     // console.log(result);
  //     res.send({
  //       message: "Question has been deleted",
  //     });
  //     // Transaction has been committed
  //     // result is whatever the result of the promise chain returned to the transaction callback
  //   }).catch(function (err) {
  //     // console.log(err);
  //     return res.status(400).send({
  //       message: "Question hasn't been delete",
  //     });
  //     // Transaction has been rolled back
  //     // err is whatever rejected the promise chain returned to the transaction callback
  //   });

  // };

  return functionsObj;
};
