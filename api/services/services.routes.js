const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  fetchServiceById,
  getAllServices,
  getServiceById,
  addServiceToBasket,
  updateService,
  deleteService,
} = require("./service.controllers");

router.param("serviceId", async (req, res, next, serviceId) => {
  try {
    const foundService = await fetchServiceById(serviceId);
    if (!foundService)
      return next({ status: 404, message: "service not found" });
    req.service = foundService;
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getAllServices);
router.get("/:serviceId", getServiceById);
router.post("/:basketId/:serviceId", addServiceToBasket);
router.put("/:serviceId", updateService);

router.delete("/:serviceId", deleteService);

module.exports = router;
