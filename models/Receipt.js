const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const ReceiptSchema = new Schema({
  name: { type: Schema.Types.ObjectId, ref: "Laundry"},
  baskets: [{type: Schema.Types.ObjectId, ref: "Basket" }],
  price:{type: Number},
  user:{ type: Schema.Types.ObjectId, ref: "User"}

  // create relations in here and in the other model
});

module.exports = model("Receipt", ReceiptSchema);
