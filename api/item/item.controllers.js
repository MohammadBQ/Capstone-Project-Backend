const Item = require("../../models/Item");
const Basket = require("../../models/Basket");

exports.fetchItemById = async (serviceId) => {
  const item = await Item.findById(itemId);
  return item;
};

exports.addItem = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(403).json({ error: "You can't add a Item " });
    }
    if (req.file) {
      req.body.itemImage = `${req.file.path}`;
    }
    const item = await Item.create(req.body);
    res.status(201).json(item);
    next(error);
  } catch (error) {
    next(error);
  }
};

exports.getAllItems = async (req, res, next) => {
  try {
    // Populate here
    const items = await Item.find().populate("baskets");
    return res.status(200).json(items);
  } catch (error) {
    return next(error);
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    return res.status(200).json(req.item);
  } catch (error) {
    return next(error);
  }
};

exports.addItemToBasket = async (req, res, next) => {
  try {
    const { itemId } = req.params; // i can create a route.param
    const item = await Item.findById(itemId);

    await Basket.findByIdAndUpdate(req.basket._id, {
      $push: { items: item._id },
    }); // so we are takeing the tag and put it in the post

    await Item.findByIdAndUpdate(itemId, {
      $push: { baskets: req.basket._id },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    await Item.findByIdAndUpdate(req.item.id, req.body);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    await Item.findByIdAndRemove({ _id: req.item.id });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
