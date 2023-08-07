const Service = require("../../models/Service");
const Basket = require("../../models/Basket");

exports.fetchServiceById = async (serviceId) => {
  const service = await Service.findById(serviceId);
  return service;
};

exports.getAllServices = async (req, res, next) => {
  try {
    // Populate here
    const services = await Service.find().populate("baskets");
    return res.status(200).json(services);
  } catch (error) {
    return next(error);
  }
};

exports.getServiceById = async (req, res, next) => {
  try {
    return res.status(200).json(req.service);
  } catch (error) {
    return next(error);
  }
};

exports.addServiceToBasket = async (req, res, next) => {
  try {
    const { serviceId } = req.params; // i can create a route.param
    const service = await Service.findById(serviceId);

    await Basket.findByIdAndUpdate(req.basket._id, {
      $push: { services: service._id },
    }); // so we are takeing the tag and put it in the post

    await Service.findByIdAndUpdate(serviceId, {
      $push: { baskets: req.basket._id },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    await Service.findByIdAndUpdate(req.service.id, req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    await Service.findByIdAndRemove({ _id: req.service.id });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
