const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { ObjectId } = mongoose.Schema.Types;
const Tags = require("./tags");

const DeliveryInfoSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  pinCode: { type: Number, required: true },
  contactNumber: { type: Number, required: true },
  otherInfo: { type: String },
  productId:{type:ObjectId,ref:"products",required:true},
  createdAt: { type: String, required: true, default: new Date().toISOString() }
});
DeliveryInfoSchema.plugin(uniqueValidator);
const DeliveryInfo = mongoose.model("DeliveryInfoSchema", DeliveryInfoSchema);

DeliveryInfo.create = async deliveryInfo => {
  const newDelivery = new DeliveryInfo({
    name: deliveryInfo.name,
    email: deliveryInfo.email,
    address: deliveryInfo.address,
    pinCode: deliveryInfo.pinCode,
    contactNumber: deliveryInfo.contactNumber,
    otherInfo: deliveryInfo.otherInfo,
    productId:deliveryInfo.productId
  });
  await newDelivery.save();
  return newDelivery._id;
};

module.exports = DeliveryInfo;
