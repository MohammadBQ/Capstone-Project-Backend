const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  serviceImage: { type: String, required: true },
  categoryName: { type: String, required: true },
  comment: { type: String, required: false },
  baskets: [{ type: Schema.Types.ObjectId, ref: "Basket" }],
  laundries: [{ type: Schema.Types.ObjectId, ref: "Laundry" }],

  // create relations in here and in the other model
});

module.exports = model("Service", ServiceSchema);
