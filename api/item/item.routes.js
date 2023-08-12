const express = require("express");
const passport = require("passport");
const router = express.Router();
const upload = require("../../middlewares/uploader");

const {
  fetchItemById ,
  getAllItems,
  getItemById, 
  addItemToBasket,
  updateItem,
  addItem,
  deleteItem,
} = require("./item.controllers");

router.param("itemId", async (req, res, next, itemId) => {
  try {
    const foundItem = await fetchItemById(itemId);
    if (!foundItem )
      return next({ status: 404, message: "item not found" });
    req.item = foundItem ;
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getAllItems);
router.get("/:itemId", getItemById);
router.post("/:basketId/:itemId", addItemToBasket);
router.put("/:itemId", updateItem);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("itemImage"),
  addItem
);

router.delete("/:itemId", deleteItem);

module.exports = router;
