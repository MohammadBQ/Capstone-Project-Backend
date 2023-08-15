const express = require("express");
const passport = require("passport");
const { myOrders, createOrder } = require("./order.controllers");

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createOrder
);
router.get(
  "/myOrders",
  passport.authenticate("jwt", { session: false }),
  myOrders
);
module.exports = router;
