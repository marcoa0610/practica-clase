import express from "express";

const router = express.Router();
import employeesController from "../controllers/employeesController.js";

router.route("/")
.get(employeesController.getEmployee)
.post(employeesController.createEmployees)

router.route("/:id")
.get(employeesController.getEmployees)
.put(employeesController.updateEmployees)
.delete(employeesController.deleteEmployees)

export default router;