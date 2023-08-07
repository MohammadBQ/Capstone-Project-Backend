const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../../middlewares/uploader");
const {
    getAllLaundries,
    fetchUserfetchLaundryById,
    addLaundry,
  } = require("./laundry.controllers");




  router.param("laundryId", async (req, res, next, laundryId) => {
    try {
      const foundLaundry = await fetchUserfetchLaundryById(laundryId);
      if (!foundLaundry) return next({ status: 404, message: "Laundry not found" });
      req.laundry = foundLaundry;
      next();
    } catch (error) {
      return next(error);
    }
  });



  router.post("/", passport.authenticate("jwt", { session: false }),upload.single("image")
  ,addLaundry)
  router.get("/", getAllLaundries);
 
  module.exports = router;


