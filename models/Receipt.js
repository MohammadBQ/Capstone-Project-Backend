const { model, Schema } = require("mongoose");


const ReceiptSchema = new Schema({
  name: { type: Schema.Types.ObjectId, ref: "Laundry"},
  baskets: [{type: Schema.Types.ObjectId, ref: "Basket" }],
  price:{type: Number},
  user:{ type: Schema.Types.ObjectId, ref: "User"}

  
});

module.exports = model("Receipt", ReceiptSchema);
