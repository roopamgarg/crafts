const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { ObjectId } = mongoose.Schema.Types;
const Tags = require("./tags");

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: [{ type: String, required: true }],
  shortDescription: { type: String, required: true },
  priceStarting: { type: Number, required: true },
  availability: { type: Number, required: true },
  photos: [{ type: String, required: true }],
  additionalInfo: [{ type: String }],
  variants: [{ type: String }],
  ytVideoLink: { type: String },
  tags: [{ type: ObjectId, required: true ,ref:'tags' }],
  deliveryDetails: [{type:String}],
  createdAt: { type: String, required: true, default: new Date().toISOString() }

});
ProductSchema.plugin(uniqueValidator);
const Product = mongoose.model("products", ProductSchema);

Product.create = async product => {
  const newProduct = new Product({
    name: product.name,
    description: product.description,
    shortDescription: product.shortDescription,
    priceStarting: product.priceStarting,
    availability: product.availability,
    photos: product.photos,
    additionalInfo: product.additionalInfo,
    variants: product.variants,
    ytVideoLink: product.ytVideoLink,
    deliveryDetails:product.deliveryDetails,
    tags: product.tags
  });

  const newTags = await Tags.add(product.tags, newProduct._id);
  newProduct.tags = newTags;
  await newProduct.save();
  return newProduct._id;
};
Product.fetchSingle = async productId => {
    const products = await Product.findById(productId)
    .populate({path:"tags",select:"name"})
    return products;
}
Product.fetch = async (pageNo,pageSize) =>{
    pageNo = pageNo || 0;
    pageSize = pageSize || 15;
    const products = await Product.find({})
    .populate({path:"tags",select:"name"})
    .sort({ field: "asc", _id: -1 })
    .skip(pageNo * pageSize)
    .limit(pageSize);
    return products;
}
Product.delete = async productId => {
  const product = await Product.findByIdAndDelete(productId);
  await Tags.delete(product.tags);
  return true;
};

Product.edit = async (productId, newProduct) => {
  const product = await Product.findById(productId).populate({
    path: "tags",
    select: "name"
  });
  if (newProduct.name) {
    product.name = newProduct.name;
  }
  if (newProduct.description) {
    product.description = newProduct.description;
  }
  if (newProduct.shortDescription) {
    product.shortDescription = newProduct.shortDescription;
  }
  if (newProduct.priceStarting) {
    product.priceStarting = newProduct.priceStarting;
  }
  if (newProduct.availability) {
    product.availability = newProduct.availability;
  }
  if (newProduct.photos) {
    product.photos = newProduct.photos;
  }
  if (newProduct.additionalInfo) {
    product.additionalInfo = newProduct.additionalInfo;
  }
  if (newProduct.varients) {
    product.varients = newProduct.varients;
  }
  if (newProduct.ytVideoLink) {
    product.ytVideoLink = newProduct.ytVideoLink;
  }
  if (newProduct.tags) {
    const currentTags = product.tags.map(tag => tag.name);

    const newTags = newProduct.tags.filter(tag => {
      return !currentTags.includes(tag);
    });
    const deletedTags = product.tags.filter(tag => {
      return !newProduct.tags.includes(tag.name);
    });


    await Tags.delete(deletedTags);

    const newTagIds = await Tags.add(newTags, product._id);
    product.tags = [...product.tags.map(tag => tag._id),...newTagIds];

  }
  await product.save()
  return product._id;
};
module.exports = Product;
