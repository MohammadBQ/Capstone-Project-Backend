const Receipt = require("../../models/Receipt");
const Basket = require("../../models/Basket");








exports.fetchReceiptById = async (receiptId) => {
    const receipt = await Receipt.findById(receiptId);
    return receipt;
  };


  exports.createReceipt = async (req, res, next) => {

      const newReceipt = await Receipt.create(req.body);
      return res.status(201).json(newReceipt); }
    


  exports.getAllReceipts = async (req, res, next) => {
    try {
      // Populate here
      const receipts = await Receipt.find().populate("baskets");
      return res.status(200).json(receipts);
    } catch (error) {
      return next(error);
    }
  };
  



exports.getReceiptById = async (req, res, next) => {
    try {
      return res.status(200).json(req.receipt);
    } catch (error) {
      return next(error);
    }
  };

  exports.addBasketToReceipt = async (req, res, next) => {
    try {
      const { basketId } = req.params; // i can create a route.param
      const basket = await Basket.findById(basketId);
  
      await Receipt.findByIdAndUpdate(req.receipt._id, {
        $push: { baskets: basket._id },
      }); // so we are takeing the tag and put it in the post
  
      await Basket.findByIdAndUpdate(basketId, {
        $push: { receipts: req.receipt._id },
      });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
  