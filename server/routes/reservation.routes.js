const controller = require("../controllers/reservation.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/reservations", [authJwt.verifyToken], controller.create);

  app.put("/api/reservations/:id", [authJwt.verifyToken], controller.update);

  app.delete("/api/reservations/:id", [authJwt.verifyToken], controller.delete);

  app.get("/api/reservations/by-user/:id", [authJwt.verifyToken], controller.getAllByUserId);

  app.get("/api/reservations/by-machine/:id", [authJwt.verifyToken], controller.getAllByMachineId);
}