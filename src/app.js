
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.js');
const path = require('path');
// const jwt = require('jsonwebtoken');


require("./db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(express.json());
server.use(cors());
server.use(express.static(path.join(__dirname, "./routes/photos/dbImages1")));
server.use(express.static(path.join(__dirname, "./routes/photos/dbImages2")));
server.use(express.static(path.join(__dirname, "./routes/photos/dbImages3")));
server.use(express.static(path.join(__dirname, "./routes/photos/dbImages4")));
server.use(express.static(path.join(__dirname, "./routes/photos/dbImages5")));
server.use(express.static(path.join(__dirname, "./routes/photos/dbImages6")));
server.use(express.static(path.join(__dirname, "./routes/photos/dbImages7")));
server.use(express.static(path.join(__dirname, "./routes/photos/dbImages8")));
server.use(express.static(path.join(__dirname, "./routes/photos/dbImages9")));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
