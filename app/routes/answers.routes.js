// module.exports = (app, io) => {
module.exports = function (app, io, sequelize) {
  const answers = require("../controllers/answers.controller.js")(
    io,
    sequelize
  );

  // Retrieve all answers
  app.get("/answers", answers.findAll);

  // Retrieve a answers for single poll with id
  app.get("/answers/:id", answers.statistics);
  // app.get("/answers/:id", answers.findOne);

  // Create answers
  app.post("/answers", answers.create);

  // // Update a poll with id
  // app.put("/answers/:id", answers.update);

  // // Delete a poll with id
  // app.delete("/answers/:id", answers.delete);
};
