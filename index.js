const server = require("./src/app.js");
const { conn, User } = require("./src/db.js");

const usersData = require("./src/data/usersData");

conn.sync({ force: false }).then(() => {
  console.log("base de datos conectada");
  usersData.forEach((e) => User.create(e));
  console.log("usuarios precargados");

  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
