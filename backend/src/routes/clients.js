import express from "express";

const router = express.Router();
import clientsController from "../controllers/clientController.js";

router.route("/")
.get(clientsController.getClients)
.post(clientsController.createClients)

router.route("/:id")
.get(clientsController.getClients)
.put(clientsController.updateClients)
.delete(clientsController.deleteClients)

export default router;  