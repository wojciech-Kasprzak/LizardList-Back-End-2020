// module.exports = (app, io) => {
module.exports = function (app, io, sequelize) {
  const questions = require("../controllers/questions.controller.js")(
    io,
    sequelize
  );

  // Retrieve all questions
  app.get("/questions", questions.findAll);

  // Retrieve a single poll with id
  app.get("/questions/:id", questions.findOne);
  // app.get("/questions/:id", questions.findOne);

  // Create questions
  app.post("/questions", questions.create);

  // // Update a poll with id
  app.put("/questions/:id", questions.update);

  // // Delete a poll with id
  app.delete("/questions/:id", questions.delete);
};
