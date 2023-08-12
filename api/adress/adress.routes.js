const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
    getAdressById,
    fetchAdress,
    addAdress,
    getAllAdresses,
    updateAdress,
    deleteAdressById
} = require("./adress.controllers");



router.param("adressId", async (req, res, next, adressId) => {
    try {
      const foundAdress = await fetchAdress(AdressId);
      if (!foundAdress)
        return next({ status: 404, message: "adress not found" });
      req.adress = foundAdress ;
      return next();
    } catch (error) {
      return next(error);
    }
  });
  
  router.get("/", getAllAdresses);
  router.get("/:adressId", getAdressById);
  router.put("/:adressId", updateAdress);
  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    addAdress
  );
  
  router.delete("/:adressId", deleteAdressById);
  
  module.exports = router;
  