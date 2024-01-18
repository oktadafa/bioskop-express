var express = require("express");
var DbServices = require("../dbService");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
  const db = DbServices.getDbServiceInstance();
  const result = db.getTicket();

  result
    .then((response) => res.json({ data: response }))
    .catch((err) => res.json({ error: "gagal" }));
});

router.get("/user/:id", function (req, res) {
  const db = DbServices.getDbServiceInstance();
  const result = db.getTiketByUser(req.params.id);
  result
    .then((response) => res.json({ data: response }))
    .catch((err) => res.json({ error: "gagal" }));
});

router.get("/detail/user/:id", function (req, res) {
  const db = DbServices.getDbServiceInstance();
  const result = db.getDetailTiketUser(req.params.id);
  result
    .then((response) => res.json({ data: response }))
    .catch((err) => res.json({ error: "gagal" }));
});

module.exports = router;
