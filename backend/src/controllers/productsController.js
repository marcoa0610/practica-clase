//Aqui en el controlador iran todos los metodos
//(Metodos de C R U D)

const productsController = {};
import productsModel from "../models/Products.js";

// SELECT ALL
productsController.getProducts = async (req, res) => {
  const products = await productsModel.find();
  res.json(products);
};

// INSERT
productsController.createProducts = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const newProduct = new productsModel({ name, description, price, quantity });
  await newProduct.save();
  res.json({ message: "Product saved" });
};

// DELETE
productsController.deleteProducts = async (req, res) => {
  await productsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

// UPDATE
productsController.updateProducts = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const updatedProduct = await productsModel.findByIdAndUpdate(
    req.params.id,
    { name, description, price, quantity },
    { new: true }
  );
  res.json({ message: "Product updated", updatedProduct });
};

// SELECT ONE BY ID
productsController.getProduct = async (req, res) => {
  const product = await productsModel.findById(req.params.id);
  res.json(product);
};

export default productsController;
