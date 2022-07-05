const express = require("express");
const router = express.Router();
const { Excursion } = require("../../db");

router.get("/:coordinatorId", (req, res, next) => {
  const { coordinatorId } = req.params;

  Excursion.findAll({
    where: {
      CoordinatorId: coordinatorId,
    },
  })
    .then((response) => {
      const responseFinal = response.map((e) => {
        return {
          id: e.id,
          name: e.name,
          CoordinatorId: e.CoordinatorId,
        };
      });
      res.json(responseFinal);
    })
    .catch((err) => next(err));
});

router.post("/:coordinatorId", (req, res, next) => {
  const { coordinatorId } = req.params;
  const { name } = req.body;

  Excursion.create({
    name: name,
  })
    .then((response) => {
      response.setCoordinator(coordinatorId);
    })
    .then((response) => res.json("excursion creada y asociada correctamente"))
    .catch((err) => next(err));
});

router.delete("/:excursionId", (req, res, next) => {
  const { excursionId } = req.params;

  Excursion.destroy({
    where: {
      id: excursionId,
    },
  })
    .then((response) => {
      res.json("Excursion eliminada exitosamente");
    })
    .catch((err) => next(err));
});

module.exports = router;
