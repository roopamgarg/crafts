const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { ObjectId } = mongoose.Schema.Types;

const TagSchema = mongoose.Schema({
  name: { type: String, required: true },
  product: { type: ObjectId, required: true, ref: "products" }
});
TagSchema.plugin(uniqueValidator);
const Tag = mongoose.model("tags", TagSchema);

Tag.add = async (tags, productId) => {
  const newTags = tags.map(tag => {
    return new Tag({
      name: tag,
      product: productId
    });
  });
  const savedTags = await Tag.insertMany(newTags);
  return savedTags.map(tag => tag._id);
};

Tag.delete = async tagIds => {
  await Tag.deleteMany({
    _id: {
      $in: tagIds
    }
  });
  return true;
};

Tag.fetchByTags = async tags => {
  let products = await Tag.find({
    name: {
      $in: tags
    }
  }).populate({ path: "product", populate: { path: "tags", select: "name" } });
  let uniqueProductIds = [];
//   let uniqueProducts = [];
  products = products
    .map(product => product.product)
    .filter(product => {
        if(!product){
            return false
        } 
        const res = !uniqueProductIds.includes(product._id.toString())
        if(res){
            uniqueProductIds.push(product._id.toString())
        }
        return res;
    });
    return products
};
module.exports = Tag;
