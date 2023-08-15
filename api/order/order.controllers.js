const Order = require("../../models/Order");

exports.createOrder = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;
    const order = await Order.create(req.body);
    await req.user.updateOne({ $push: { orders: order._id } });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.myOrders = async (req, res, next) => {
  try {
    const myOrders = await Order.find({ _id: req.user.orders });
    console.log(myOrders);
    res.status(200).json(myOrders);
  } catch (error) {
    next(error);
  }
};
