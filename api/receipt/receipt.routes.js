const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
    fetchReceiptById,
    createReceipt,
    getAllReceipts,
    addBasketToReceipt,
    getReceiptById,
  } = require("./receipt.controllers");



router.param("receiptId", async (req, res, next, receiptId) => {
    try {
      const foundReceipt = await fetchReceiptById(receiptId);
      if (!foundReceipt) return next({ status: 404, message: "No receipt with this id" });
      reqreceipt = foundReceipt;
      return next();
    } catch (error) {
      return next(error);
    }
  });
  



  router.get("/:receiptId", getReceiptById)
  router.get("/", getAllReceipts)
  router.post("/", passport.authenticate("jwt", { session: false }), createReceipt);
  router.post("/:receiptId/:basketId", addBasketToReceipt);






  
  module.exports = router;
