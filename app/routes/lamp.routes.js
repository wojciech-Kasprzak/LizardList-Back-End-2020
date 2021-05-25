// module.exports = (app, io) => {
module.exports = function (app,io,sequelize) {
  const lamps = require("../controllers/lamp.controller.js")(io,sequelize);

  // Create Lamp
  app.post('/lamps', lamps.create);

  // Retrieve all Lamp
  app.get('/lamps', lamps.findAll);

  // Retrieve a single Lamp with lampId
  app.get('/lamps/:lampName', lamps.findOne);

  // Update a Lamp with lampId
  app.put('/lamps/:lampName', lamps.update);

  // Delete a Lamp with lampId
  app.delete('/lamps/:lampName', lamps.delete);
  
}
