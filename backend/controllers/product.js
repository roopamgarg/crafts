const Product = require("../models/products");
const Tags = require("../models/tags");
const ProductHandler = {};

ProductHandler.create = async (req, res) => {
  try {
    const productId = await Product.create(req.body);
    res.status(200).json({
      id: productId,
      message: "Product Added Successfully"
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

ProductHandler.fetchOne = async (req, res) => {
  try {
    const product = await Product.fetchSingle(req.params.id);
    if (!product) {
      res.status(404).json({
        message: "product Not found"
      });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
ProductHandler.edit = async (req, res) => {
  try {
    await Product.edit(req.params.id, req.body);
    res.status(200).json({
      message: "Product Edited Successfully"
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
ProductHandler.delete = async (req, res) => {
  try {
    await Product.delete(req.params.id);
    res.status(200).json({
      message: "Product Deleted Successfully"
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
ProductHandler.fetchAll = async (req, res) => {
  try {
    const products = await Product.fetch(req.query.pageNo, req.query.pageSize);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
ProductHandler.fetchByTags = async (req, res) => {
  try {
    console.log(req.query)
    const products = await Tags.fetchByTags(JSON.parse(req.query.tags));
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};



module.exports = ProductHandler;
