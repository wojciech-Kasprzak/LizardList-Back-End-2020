// module.exports = (app, io) => {
module.exports = function (app, io, sequelize) {
  const polls = require("../controllers/polls.controller.js")(io, sequelize);

  // Retrieve all polls
  app.get("/polls", polls.findAll);

  // Retrieve a single poll with pollId
  app.get("/polls/:id", polls.findOne);
  // app.get("/polls/:pollID", polls.findOne);

  // Create poll
  app.post("/polls", polls.create);

  // Update a poll with pollId
  app.put("/polls/:id", polls.update);

  // Delete a poll with pollId
  // app.delete("/polls/:pollID", polls.delete);
};
