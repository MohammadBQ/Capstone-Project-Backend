const express = require("express");
const passport = require("passport");
const router = express.Router();
const upload = require("../../middlewares/uploader");

const {
  fetchServiceById,
  getAllServices,
  getServiceById,
  addServiceToBasket,
  updateService,
  deleteService,
  addServices,
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
router.post(
  "/creatServices",
  passport.authenticate("jwt", { session: false }),
  upload.single("serviceImage"),
  addServices
);

router.delete("/:serviceId", deleteService);

module.exports = router;
