const { model, Schema } = require("mongoose");
// Everything with the word temp is a placeholder that you'll change in accordance with your project

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  number: {type: Number, required: false},
  email: { type: String, required: false},
  orders:{ type: String},
  laundry: [{type: Schema.Types.ObjectId, ref: "Laundry" }],
  receipt: [{type: Schema.Types.ObjectId, ref: "Receipt" }],
  reviews:[{type: Schema.Types.ObjectId, ref: "Review" }]

  // create relations in here and in the other model
});

module.exports = model("User", UserSchema);
