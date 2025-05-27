import express from "express";
import branchesController from "../controllers/branchesController.js"; // ✔


const router = express.Router();

// GET all branches
router.get("/", branchesController.getBranches);

// GET one branch by ID
router.get("/:id", branchesController.getBranchById);

// POST create new branch
router.post("/", branchesController.createBranch);

// PUT update branch
router.put("/:id", branchesController.updateBranch);

// DELETE branch
router.delete("/:id", branchesController.deleteBranch);

export default router;