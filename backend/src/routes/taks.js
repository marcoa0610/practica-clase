import express from "express";
import tasksController from "../controllers/tasksController.js"; // ✔


const router = express.Router();

// GET all branches
router.get("/", tasksController.gettasks);

// GET one branch by ID
router.get("/:id", tasksController.gettaskById);

// POST create new branch
router.post("/", tasksController.createtask);

// PUT update branch
router.put("/:id", tasksController.updatetask);

// DELETE branch
router.delete("/:id", tasksController.deletetask);

export default router;