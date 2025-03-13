import express from "express";

const router = express.Router();
import branchesController from "../controllers/branchesController.js";

router.route("/")
.get(branchesController.getBranch)
.post(branchesController.createBranch)

router.route("/:id")
.get(branchesController.getBranch)
.put(branchesController.updateBranch)
.delete(branchesController.deleteBranch)

export default router;  