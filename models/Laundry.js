const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const LaundrySchema = new Schema({
  name: { type: String, unique: true, required: true },
  location: { type: String, required: true },
  number: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  receipts: [{ type: Schema.Types.ObjectId, ref: "Receipt" }],
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],

  // create relations in here and in the other model
});

module.exports = model("Laundry", LaundrySchema);
