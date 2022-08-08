const express = require("express");

const { User, Coordinator, Enterprise } = require("../../db");
const router = express.Router();

// endpoint localhost: http://localhost:3001/users/
// endpoint hosting:

router.get("/", async (req, res, next) => {
  try {
    const usuarios = await User.findAll({
      include: Coordinator,
      where: {
        role: "user",
      },
    });

    const resCoordinadores = await Coordinator.findAll();

    const coordinadores = resCoordinadores.map((e) => {
      return {
        id: e.id,
        name: e.name,
        enterpriseId: e.EnterpriseId,
      };
    });

    const resEmpresas = await Enterprise.findAll();

    const empresas = resEmpresas.map((e) => {
      return {
        id: e.id,
        name: e.name,
      };
    });

    function coordinatorName(id) {
      const coordinator = coordinadores.find((e) => e.id === id);
      console.log(coordinator, 'llega?')
      const name = coordinator.name;
      return name;
    }

    function enterpriseName(id) {
      const obj = empresas.find((e) => e.id === id);
      const name = obj.name;

      return name;
    }

    const FixedCoordinators = coordinadores.map((e) => {
      return {
        id: e.id,
        name: e.name,
        enterprise: enterpriseName(e.enterpriseId),
      };
    });

    const users = usuarios.map((e) => {
      return {
        id: e.id,
        name: e.name,
        email: e.email,
        password: e.password,
        phoneNumber: e.phoneNumber,
        CoordinatorId: e.CoordinatorId,
        role: e.role,
        isAcepted: e.isAcepted
      };
    });

    function userData() {
      const data = users.map((e) => {
        const coordinator = FixedCoordinators.find(
          (f) => e.CoordinatorId === f.id
        );

        return {
          id: e.id,
          name: e.name,
          email: e.email,
          phoneNumber: e.phoneNumber,
          password: e.password,
          coordinator: coordinatorName(e.CoordinatorId),
          enterprise: coordinator.enterprise,
          isAcepted: e.isAcepted
        };
      });
      return data;
    }

    const fixedUsers = userData();
    res.json(fixedUsers);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", (req, res, next) => {
  const { id } = req.params;

  User.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((response) => {
      res.json("El usuario ha sido modificado correctamente");
    })
    .catch((err) => next(err));
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;

  User.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((response) => {
      res.json("El usuario ha sido modificado correctamente");
    })
    .catch((err) => next(err));
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  User.destroy({
    where: {
      id: id,
    },
  })
    .then((response) => {
      res.json("Usuario eliminado exitosamente");
    })
    .catch((err) => next(err));
});

module.exports = router;
