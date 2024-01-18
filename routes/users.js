var express = require("express");
var DbServices = require("../dbService");
var router = express.Router();
var bcrypt = require("bcryptjs");

/* GET users listing. */
router.get("/", function (req, res) {
  const db = DbServices.getDbServiceInstance();
  const result = db.getUsers();

  result
    .then((response) => res.json({ data: response }))
    .catch((err) => res.json({ error: err }));
});

router.post("/tambah", (req, res) => {
  const db = DbServices.getDbServiceInstance();
  const data = req.body;
  bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(data.password, salt, (err, hash) => {
      data.password = hash;
      const result = db.insertUsers(data);
      result
        .then((response) => {
          if (Object.keys(response).length === 0) {
            res.json({
              message: "Data Tidak Berhasil Ditambahkan",
              status: 500,
              data: response,
            });
          } else {
            res.json({
              message: "Data Berhasil Ditambah",
              status: 200,
              data: response,
            });
          }
        })
        .catch((err) => res.json({ data: err }));
    });
  });
});

router.put("/ubah", (req, res) => {
  const db = DbServices.getDbServiceInstance();
  const data = req.body;
  const result = db.editusers(data);

  result
    .then((response) => {
      if (Object.keys(response).length === 0) {
        res.json({
          message: "Data Tidak Berhasil Diubah",
          status: 500,
          data: response,
        });
      } else {
        res.json({
          message: "Data Berhasil Diubah",
          status: 200,
          data: response,
        });
      }
    })
    .catch((err) => res.json({ error: err }));
});

router.delete("/hapus/:id", (req, res) => {
  const db = DbServices.getDbServiceInstance();
  const result = db.hapusUser(req.params.id);

  result
    .then((response) => res.json({ data: response }))
    .catch((err) => console.log(err));
});
module.exports = router;
