import bcrypt, { compare } from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import clientModel from "../models/Clients.js";
import employeesModel from "../models/Employees.js";
import { config } from "../config.js";

//Array de funciones 
const loginController ={};

loginController.login = async (req, res) => {
const {email, password} = req.body;

try {
    let userFound; // Guardar usuario encontrado
    let userType; // Guardar el tipo de usuario


     // Admin, Empleados y Clientes
     if (email === config.admin.email && password === config.admin.password){
        userType = "admin";
        userFound = {_id: "admin"};
     }else{
        user = await employeesModel.findOne({email});
        userType = "employee";

        if(!userFound){
            userFound = await clientModel.findOne({email})
            userType = "client"
        }
     }

     if(!userFound){
        return res.json({message: "user not found"})
     }




     //Desencriptar la contraseña si no es admin
     if(userType !== "admin"){
        const isMatch =bcrypt.js.compare(password, userFound.password)
        if(!isMatch){
            res.json({message: "Invalid password"})
        }
     }


     jsonwebtoken.sign(
        //1- ¿Que voy a guardar?
        {id: userFound._id, userType},
        //2- secreto
        config.JWT.secret, 
        //3- ¿Cuando expira?
        {expiresIn: config.JWT.expires},

        //4- Funcion fleca

        (error, token) => {
            if(error) console.log ("error"+error)
                res.cookie("authToken", token)
            res.json({message: "login successful"})
        }
     )


} catch (error) {
    
}

};


export default loginController; 