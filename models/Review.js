const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const ReviewSchema = new Schema({

  rating: { type: Number },
  avgRating: { type: String, required: false, default: 0 },
  comments: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  laundry: { type: Schema.Types.ObjectId, ref: "Laundry" },


  // create relations in here and in the other model
});


module.exports = model("Review", ReviewSchema);

