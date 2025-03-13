//Aqui en el controlador iran todos los metodos
//(Metodos de C R U D)

const branchesController = {};
import branchesModel from "../models/Branches.js";

// SELECT
branchesController.getBranch = async (req, res) => {
    const branches = await branchesModel.find();
    res.json(branches)
}

//INSERT 
branchesController.createBranch = async (req, res) => {
    const {name, address, telephone, schedule} = req.body;

    const newBranch = new branchesModel({name, address, telephone, schedule})

    await newBranch.save();
    res.json({message: "Branch saved"});
}

//DELETE
branchesController.deleteBranch = async(req, res) => {
    const deleteBranch = await branchesModel.findByIdAndDelete (req.params.id);
    res.json({message: "Branch Deleted"})
}

//UPDATE
branchesController.updateBranch = async(req, res) => {
    const {name, address, telephone, schedule} = req.body;
    const updateBranch = await branchesModel.findByIDAndUpdate(req.params.id,
        {name, address, telephone, schedule}, {new: true}
    );

    res.json ({message: "Branch Updated"})

}

//SELECT 1 PRODUCT BY ID
branchesController.getBranch = async (req, res) => {
    const branches = await branchesModel.findById(req.params.id);
    res.json(branches);
}

export default branchesController; 