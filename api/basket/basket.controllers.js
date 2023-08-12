const Basket = require("../../models/Basket");

const Service = require("../../models/Service");

exports.fetchBasketById = async (basketId) => {
  const basket = await Basket.findById(basketId);
  return basket;
};

exports.createBasket = async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(403)
        .json({ error: "You don't have permission to perform this action" });
      // 403 = Forbidden
    }
    const newBasket = await Basket.create(req.body);
    return res.status(201).json(newBasket);
  } catch (error) {
    return next(error);
  }
};

exports.getAllBaskets = async (req, res, next) => {
  try {
    // Populate here
    const baskets = await Basket.find().populate("services");
    return res.status(200).json(baskets);
  } catch (error) {
    return next(error);
  }
};

exports.getBasketById = async (req, res, next) => {
  try {
    return res.status(200).json(req.basket);
  } catch (error) {
    return next(error);
  }
};



exports.updateBasket = async (req, res, next) => {
  try {
    await Basket.findByIdAndUpdate(req.basket.id, req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
