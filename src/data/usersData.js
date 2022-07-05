require('dotenv').config();

const { ADMIN_EMAIL_1, ADMIN_PASS_1, ADMIN_EMAIL_2, ADMIN_PASS_2 } = process.env;

// const pass1 = ADMIN_PASS_1.toString()


const usersData = [
  {
    name: "Administrador",
    email: ADMIN_EMAIL_1,
    password: ADMIN_PASS_1,
    phoneNumber: "541121775778",
    CoordinatorId: null,
    role: "admin",
  },
  {
    name: "Mariano Cejas",
    email: ADMIN_EMAIL_2,
    password: ADMIN_PASS_2,
    phoneNumber: "541121564585",
    CoordinatorId: null,
    role: "admin",
  }
];

module.exports = usersData;
