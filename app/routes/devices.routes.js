// module.exports = (app, io) => {
module.exports = function (app, io, sequelize) {
  const devices = require("../controllers/devices.controller.js")(
    io,
    sequelize
  );

  // Retrieve all devices
  app.get("/devices", devices.findAll);

  // Retrieve a single poll with pollId
  app.get("/devices/:deviceID", devices.findOne);

  // Create poll
  app.post("/devices/:deviceID", devices.changeStatus);

  // Update a poll with ownerId
  // app.put("/devices/:ownerID", devices.update);

  // Delete a poll with ownerId
  // app.delete("/devices/:ownerID", devices.delete);
};
