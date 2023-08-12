const express = require("express");
const passport = require("passport");
const router = express.Router();

const {

  fetchBasketById,
  getAllBaskets,
  getBasketById,
  createBasket,
  updateBasket,
} = require("./basket.controllers");

router.param("basketId", async (req, res, next, basketId) => {
  try {
    const foundBasket = await fetchBasketById(basketId);
    if (!foundBasket) return next({ status: 404, message: "basket not found" });
    req.basket = foundBasket;
    return next();
  } catch (error) {
    return next(error);
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createBasket
);
router.put("/:basketId", updateBasket);
router.get("/", getAllBaskets);
router.get("/:basketId", getBasketById);

module.exports = router;

