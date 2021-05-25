// module.exports = (app, io) => {
module.exports = function (app, io, sequelize) {
  const owners = require("../controllers/owners.controller.js")(io, sequelize);

  // Retrieve all owners
  app.get("/owners", owners.findAll);

  // Retrieve a single poll with pollId
  app.get("/owners/:ownerID", owners.findOne);

  // Create poll
  app.post("/owners", owners.create);

  // Update a poll with ownerId
  // app.put("/owners/:ownerID", owners.update);

  // Delete a poll with ownerId
  // app.delete("/owners/:ownerID", owners.delete);
};
