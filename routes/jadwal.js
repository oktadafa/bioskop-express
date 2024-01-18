var express = require("express");
var DbServices = require("../dbService");
var router = express.Router();

router.get("/", (req, res) => {
  const db = DbServices.getDbServiceInstance();
  const result = db.getJadwal();

  result
    .then((response) => res.json({ data: response }))
    .catch((err) => res.json({ error: err }));
});

router.post("/tambah", (req, res) => {
  const db = DbServices.getDbServiceInstance();
  const result = db.insertjadwal(req.body);

  result
    .then((response) => res.json({ data: response }))
    .catch((err) => res.json({ error: err }));
});

router.put("/ubah/", (req, res) => {
  const db = DbServices.getDbServiceInstance();
  const result = db.editJadwal(req.body);

  result
    .then((response) => res.json({ data: response }))
    .catch((err) => console.log(err));
});

router.delete("/hapus/:id", (req, res) => {
  const db = DbServices.getDbServiceInstance();
  const result = db.hapusJadwal(req.params.id);

  result
    .then((response) => res.json({ data: response }))
    .catch((err) => console.log(err));
});
module.exports = router;
