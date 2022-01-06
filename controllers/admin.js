const Product = require("../models/product");
exports.getAddproduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: false,
  });
};
exports.postAddproduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  await req.user.createProduct({
    title,
    imageUrl,
    price,
    description,
  });
  res.redirect("/admin/products");
};
exports.getEditProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findByPk(prodId);
  if (!product) {
    return res.redirect("/admin/products");
  }
  res.render("admin/edit-product", {
    pageTitle: "Edit product",
    path: "/admin/edit-product",
    editing: true,
    product,
  });
};
exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const product = await Product.findByPk(prodId);
  product.title = updatedTitle;
  product.imageUrl = updatedImageUrl;
  product.price = updatedPrice;
  product.description = updatedDescription;

  await product.save();
  res.redirect("/admin/products");
};

exports.getProduct = async (req, res, next) => {
  const products = await Product.findAll();
  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};
exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  await Product.destroy({ where: { id: prodId } });
  res.redirect("/admin/products");
};
