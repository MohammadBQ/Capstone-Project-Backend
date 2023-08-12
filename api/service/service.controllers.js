const Service = require("../../models/Service")
const Item = require("../../models/Item")


exports.fetchService = async (serviceId, next) => {

    try {
      const service = await Service.findById(serviceId);
      return service;
    } catch (error) {
      return next(error);
    }
  };

  exports.addService = async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(403).json({ error: "You can't add a service " });
        
      }
  

      const service = await Service.create(req.body);
      res.status(201).json(service);
      next(error);
    } catch (error) {
      next(error);
    }
  };
  exports.getServiceById = async (req, res, next) => {
    try {
      return res.status(200).json(req.service);
    } catch (error) {
      return next(error);
    }
  };


  exports.getAllServices = async (req, res, next) => {
    try {
      const services = await Service.find();
      res.json(services);
    } catch (error) {
      next(error);
    }
  };
  


exports.addServiceToItem = async (req, res, next) => {
    try {
      const { serviceId } = req.params; // i can create a route.param
      const service = await Service.findById(serviceId);
  
      await Item.findByIdAndUpdate(req.item._id, {
        $push: { services: service._id },
      }); // so we are takeing the tag and put it in the post
  
      await Service.findByIdAndUpdate(serviceId, {
        $push: { items: req.item._id },
      });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };


  exports.deleteServiceById = async (req, res, next) => {
    try {
      await req.service.deleteOne();
      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  };


  