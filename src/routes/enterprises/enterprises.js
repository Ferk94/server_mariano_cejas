const { response } = require("express");
const express = require("express");
const router = express.Router();
const { Enterprise } = require("../../db");

router.get("/", (req, res, next) => {
  Enterprise.findAll()
    .then((response) => {
      const responseFinal = response.map((e) => {
        return {
          id: e.id,
          name: e.name,
        };
      });
      res.json(responseFinal);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  const { name, logo } = req.body;

  Enterprise.create({ name, logo })
    .then((response) => {
      res.json("Empresa agregada exitosamente");
    })
    .catch((err) => next(err));
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
console.log(id, 'q onda con el id')
  Enterprise.destroy({
    where: {
      id: id,
    },
  })
    .then((response) => {
      res.json("Empresa eliminada exitosamente");
    })
    .catch((err) => next(err));
});

module.exports = router;
