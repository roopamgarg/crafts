const DeliveryInfo = require("../models/deliveryInfo");

const DeliveryInfoHandler = {}

DeliveryInfoHandler.create = async (req,res) => {
    try {
        const deliveryInfoId = await DeliveryInfo.create(req.body);
        res.status(200).json({
          id: deliveryInfoId,
          message: "Information Added Successfully"
        });
      } catch (err) {
        console.log(err)
        res.status(500).json({
          error: err.message
        });
      }
}

module.exports = DeliveryInfoHandler