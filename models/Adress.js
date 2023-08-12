const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const AdressSchema = new Schema({

  area: { type: String, required: true },
  block:  { type: String, required: true },
  street:  { type: String, required: true },
  province:  { type: String, required: true },
  houseNumber:  { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  


  // create relations in here and in the other model
});


module.exports = model("Adress", AdressSchema);
