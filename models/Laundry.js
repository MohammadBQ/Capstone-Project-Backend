const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const LaundrySchema = new Schema({
  name: { type: String, unique: true, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
      default: [0, 0],
    },
  },
  workingHours: { type: String, required: true },
  number: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  items: [{type: Schema.Types.ObjectId, ref: "Item" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  receipts: [{ type: Schema.Types.ObjectId, ref: "Receipt" }],
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],

  // create relations in here and in the other model
});

module.exports = model("Laundry", LaundrySchema);
