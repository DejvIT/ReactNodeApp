const controller = require("../controllers/machine.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/machines", controller.getAll);
  app.post("/api/machines/update", [authJwt.verifyToken], controller.bulkUpdate);
  app.post("/api/machines/filter", controller.filter);
  app.get("/api/machines/by-url/:url", [authJwt.verifyToken], controller.getAllByUrl);
}
