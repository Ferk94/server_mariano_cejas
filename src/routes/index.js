const { Router } = require("express");

const usersRoute = require("./users/Users");
const userRoute = require("./users/User");
const photosRoute = require("./photos/Photos");
const sendMail = require("./sendMail/sendMail");
const enterpriseRoute = require("./enterprises/enterprises");
const coordinatorRoute = require("./coordinators/coordinators");
const excursionRoute = require("./excursions/excursions");

const router = Router();

router.use("/users", usersRoute);
router.use("/user", userRoute);
router.use("/photos", photosRoute);
router.use("/sendMail", sendMail);
router.use("/enterprises", enterpriseRoute);
router.use("/coordinators", coordinatorRoute);
router.use("/excursions", excursionRoute);

module.exports = router;
