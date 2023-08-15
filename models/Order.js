const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const OrderSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  cart: [
    {
      amount: String,
      id: String,
      productImage: String,
      productType: String,
      totalCount: String,
      washOption: String,
    },
  ],
  laundry: {
    description: String,
    image: String,
    location: String,
    name: String,
    number: String,
  },
  amountToPay: String,
});

module.exports = model("Order", OrderSchema);
