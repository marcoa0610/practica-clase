//Aqui en el controlador iran todos los metodos
//(Metodos de C R U D)

const branchesController = {};
import branchesModel from "../models/Branches.js";

// SELECT ALL
branchesController.getBranches = async (req, res) => {
    try {
      const branches = await branchesModel.find();
      console.log("Branches encontrados:", branches);
      if (!Array.isArray(branches)) {
        return res.status(500).json({ message: "branches no es un array", data: branches });
      }
      res.json(branches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

// SELECT ONE BY ID
branchesController.getBranchById = async (req, res) => {
    try {
        const branch = await branchesModel.findById(req.params.id);
        if (!branch) {
            return res.status(404).json({ message: "Branch not found" });
        }
        res.json(branch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// INSERT 
branchesController.createBranch = async (req, res) => {
    try {
        const { name, address, telephone, schedule } = req.body;
        
        const newBranch = new branchesModel({ name, address, telephone, schedule });
        await newBranch.save();
        
        res.status(201).json({ message: "Branch saved", branch: newBranch });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// UPDATE
branchesController.updateBranch = async (req, res) => {
    try {
        const { name, address, telephone, schedule } = req.body;
        const updatedBranch = await branchesModel.findByIdAndUpdate(
            req.params.id,
            { name, address, telephone, schedule }, 
            { new: true }
        );
        
        if (!updatedBranch) {
            return res.status(404).json({ message: "Branch not found" });
        }
        
        res.json({ message: "Branch Updated", branch: updatedBranch });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// DELETE
branchesController.deleteBranch = async (req, res) => {
    try {
        const deletedBranch = await branchesModel.findByIdAndDelete(req.params.id);
        
        if (!deletedBranch) {
            return res.status(404).json({ message: "Branch not found" });
        }
        
        res.json({ message: "Branch Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default branchesController;