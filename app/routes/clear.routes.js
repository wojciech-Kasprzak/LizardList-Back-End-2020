// module.exports = (app, io) => {
module.exports = function (app, io, sequelize) {
    const clear = require("../controllers/clear.controller.js")(io, sequelize);

    app.get("/clear", clear.clearTables);

};
