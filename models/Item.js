const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const ItemSchema = new Schema({
  categoryName: { type: String, required: true },
  name: { type: String, required: true },
  itemImage: { type: String, required: true },
  comment: { type: String, required: false },
  baskets: [{ type: Schema.Types.ObjectId, ref: "Basket" }],
  laundries: [{ type: Schema.Types.ObjectId, ref: "Laundry" }],
  services: [{ type: Schema.Types.ObjectId, ref: "Service" }],

  // create relations in here and in the other model
});

module.exports = model("Item", ItemSchema);
