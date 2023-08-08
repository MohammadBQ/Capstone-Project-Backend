const Laundry = require("../../models/Laundry");

exports.getAllLaundries = async (req, res, next) => {
  try {
    const laundries = await Laundry.find();
    res.json(laundries);
  } catch (error) {
    next(error);
  }
};

exports.getLaundryById = async (req, res, next) => {
  try {
    res.status(200).json(req.laundry);
  } catch (error) {
    next(error);
  }
};
exports.fetchLaundryById = async (laundryId) => {
  const laundry = await Laundry.findById(laundryId);
  return laundry;
};

exports.addLaundry = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(403).json({ error: "You can't add a launry " });
      // 403 = Forbidden
    }

    if (req.file) {
      req.body.image = `${req.file.path}`;
    }
    const laundry = await Laundry.create(req.body);
    res.status(201).json(laundry);
    next(error);
  } catch (error) {
    next(error);
  }
};
