//Aqui en el controlador iran todos los metodos
//(Metodos de C R U D)

const tasksController = {};
import tasks from "../models/tasks.js";

// SELECT ALL
tasksController.gettasks = async (req, res) => {
    try {
      const tasks = await tasksModel.find();
      console.log("tasks encontrados:", tasks);
      if (!Array.isArray(tasks)) {
        return res.status(500).json({ message: "tasks no es un array", data: tasks });
      }
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

// SELECT ONE BY ID
tasksController.gettaskById = async (req, res) => {
    try {
        const task = await tasksModel.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "task not found" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// INSERT 
tasksController.createtask = async (req, res) => {
    try {
        const { name, address, telephone, schedule } = req.body;
        
        const newtask = new tasksModel({ name, address, telephone, schedule });
        await newtask.save();
        
        res.status(201).json({ message: "task saved", task: newtask });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// UPDATE
tasksController.updatetask = async (req, res) => {
    try {
        const { name, address, telephone, schedule } = req.body;
        const updatedtask = await tasksModel.findByIdAndUpdate(
            req.params.id,
            { name, address, telephone, schedule }, 
            { new: true }
        );
        
        if (!updatedtask) {
            return res.status(404).json({ message: "task not found" });
        }
        
        res.json({ message: "task Updated", task: updatedtask });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// DELETE
tasksController.deletetask = async (req, res) => {
    try {
        const deletedtask = await tasksModel.findByIdAndDelete(req.params.id);
        
        if (!deletedtask) {
            return res.status(404).json({ message: "task not found" });
        }
        
        res.json({ message: "task Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default tasksController;