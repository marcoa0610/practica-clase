//Aqui en el controlador iran todos los metodos
//(Metodos de C R U D)

const employeesController = {};
import employeesModel from "../models/Employees.js";

// SELECT
employeesController.getEmployees = async (req, res) => {
    const employees = await employeesModel.find();
    res.json(employees)
}

//INSERT 
employeesController.createEmployees = async (req, res) => {
    const {name, lastName, birthday, email, password, telephone, dui, isVerified} = req.body;

    const newEmployee = new employeesModel({ name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified })

    await newEmployee.save();
    res.json({message: "Employee saved"});
}

//DELETE
employeesController.deleteEmployees = async(req, res) => {
    const deleteEmployees = await employeesModel.findByIdAndDelete (req.params.id);
    res.json({message: "Employee Deleted"})
}

//UPDATE
employeesController.updateEmployees = async(req, res) => {
    const {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified} = req.body;
    const updatedEmployees = await employeesModel.findByIDAndUpdate(req.params.id,
        {name, lastName, birthday, email, address, hireDate, password, telephone, dui, isssNumber, isVerified}, {new: true}
    );

    res.json ({message: "Employee Updated"})

}

//SELECT 1 PRODUCT BY ID
employeesController.getEmployees = async (req, res) => {
    const employee = await employeesModel.findById(req.params.id);
    res.json(employee);
}

export default employeesController;
