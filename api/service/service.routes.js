const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
    fetchService,
    addService,
    addServiceToItem,
    deleteServiceById,
    getAllServices,
    getServiceById,
  } = require("./service.controllers");










  router.param("serviceId", async (req, res, next, serviceId) => {
    try {
      const foundService = await fetchService(serviceId);
      if (!foundService) return next({ status: 404, message: "No service with this id" });
      req.service = foundService;
      return next();
    } catch (error) {
      return next(error);
    }
  });
  



  router.get("/", getAllServices);
  router.get("/:serviceId", getServiceById);

  router.post("/", passport.authenticate("jwt", { session: false }), addService);
  router.post("/:itemId/:serviceId", addServiceToItem);
  router.delete("/:serviceId", deleteServiceById);









  
  module.exports = router;