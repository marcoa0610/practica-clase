//Aqui en el controlador iran todos los metodos
//(Metodos de C R U D)

const productsController = {};
import productsModel from "../models/Products.js";

// SELECT
productsController.getProducts = async (req, res) => {
    const products = await productsModel.find();
    res.json(products)
}

//INSERT 
productsController.createProducts = async (req, res) => {
    const {name, description, price, stock} = req.body;

    const newProduct = new productsModel({name, description, price, stock})

    await newProduct.save();
    res.json({message: "Product saved"});
}

//DELETE
productsController.deleteProducts = async(req, res) => {
    const deleteProduct = await productsModel.findByIdAndDelete (req.params.id);
    res.json({message: "Product Deleted"})
}

//UPDATE
productsController.updateProducts = async(req, res) => {
    const {name, description, price, stock} = req.body;
    const updatedProducts = await productsModel.findByIDAndUpdate(req.params.id,
        {name, description, price, stock}, {new: true}
    );

    res.json ({message: "producto actualizado"})

}

//SELECT 1 PRODUCT BY ID
productsController.getProduct = async (req, res) => {
    const product = await productsModel.findById(req.parms.id);
    res.json(product);
}

export default productsController;
