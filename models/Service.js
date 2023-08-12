const { model, Schema } = require("mongoose");


const ServiceSchema = new Schema({
  serviceName: { type: String, required: true },
  price: { type: Number, required: true },
  items: [{type: Schema.Types.ObjectId, ref: "Item" }],
  

  // create relations in here and in the other model
});

module.exports = model("Service", ServiceSchema);
