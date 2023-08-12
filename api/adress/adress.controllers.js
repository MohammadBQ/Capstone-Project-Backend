const Adress = require("../../models/Adress")


exports.fetchAdress = async (adressId, next) => {

    try {
      const adress= await Adress.findById(adressId);
      return adress;
    } catch (error) {
      return next(error);
    }
  };

  exports.addAdress = async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(403).json({ error: "You can't add an adress " });
        
      }
  

      const adress = await Adress.create(req.body);
      res.status(201).json(adress);
      next(error);
    } catch (error) {
      next(error);
    }
  };


  exports.getAdressById = async (req, res, next) => {
    try {
      return res.status(200).json(req.adress);
    } catch (error) {
      return next(error);
    }
  };


  exports.getAllAdresses = async (req, res, next) => {
    try {
      const adresses = await Adress.find();
      res.json(adresses);
    } catch (error) {
      next(error);
    }
  };
  

  exports.deleteAdressById = async (req, res, next) => {
    try {
      await req.adress.deleteOne();
      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  };

  exports.updateAdress = async (req, res, next) => {
    try {
      await Adress.findByIdAndUpdate(req.adress.id, req.body);
      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  };
  