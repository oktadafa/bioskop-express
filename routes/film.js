var express = require("express");
var DbServices = require("../dbService");
var router = express.Router();

router.get("/", (req, res) => {
  const dbser = DbServices.getDbServiceInstance();
  const result = dbser.getAllFilm();

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => res.json({ err: err }));
});

router.post("/tambah", (req, res) => {
  const dbser = DbServices.getDbServiceInstance();
  const data = req.body;
  data.durasi = `${data.jam}:${data.menit}:${data.detik}`;
  const result = dbser.insertFilm(data);
  result
    .then((response) => {
      console.log(response);
      res.json({ data: response });
    })
    .catch((err) => res.json({ err: err }));
});

router.put("/ubah/", (req, res) => {
  const dbser = DbServices.getDbServiceInstance();
  const data = req.body;
  data.durasi = `${data.jam}:${data.menit}:${data.detik}`;
  const result = dbser.editFilm(data);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => res.json({ err: err }));
});

router.delete("/hapus/:id", (req, res) => {
  const dbser = DbServices.getDbServiceInstance();
  const id = req.params.id;
  const result = dbser.hapusFilm(id);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => res.json({ err: err }));
});
module.exports = router;
