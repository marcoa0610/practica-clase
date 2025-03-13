//Aqui en el controlador iran todos los metodos
//(Metodos de C R U D)

const clientsController = {};
import clientsModel from "../models/Clients.js";

// SELECT
clientsController.getClients = async (req, res) => {
    const clients = await clientsModel.find();
    res.json(clients)
}

//INSERT 
clientsController.createClients = async (req, res) => {
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;

    const newClient = new clientsModel({name, lastName, birthday, email, password, telephone, dui, isVerified})

    await newClient.save();
    res.json({message: "Client saved"});
}

//DELETE
clientsController.deleteClients = async(req, res) => {
    const deleteClients = await clientsModel.findByIdAndDelete (req.params.id);
    res.json({message: "Client Deleted"})
}

//UPDATE
clientsController.updateClients = async(req, res) => {
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;
    const updatedClients = await clientsModel.findByIDAndUpdate(req.params.id,
        {name, lastName, birthday, email, password, telephone, dui, isVerified}, {new: true}
    );

    res.json ({message: "Client Updated"})

}

//SELECT 1 PRODUCT BY ID
clientsController.getCleints = async (req, res) => {
    const client = await clientsModel.findById(req.params.id);
    res.json(client);
}

export default clientsController;
