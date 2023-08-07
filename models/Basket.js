const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const BasketSchema = new Schema({

  comment: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  services: [{ type: Schema.Types.ObjectId, ref: "Service" }],


  // create relations in here and in the other model
});


module.exports = model("Basket", BasketSchema);

