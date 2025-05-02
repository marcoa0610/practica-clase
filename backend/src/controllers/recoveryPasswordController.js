import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import clientModel from "../models/Clients.js"
import employeeModel from "../models/Employees.js"

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailRecoveryPassword.js";
import {config} from "../config.js";

//1- Array de funciones

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async(req, res) =>{
 const {email} = req.body;

 try {
    

    let userFound;
    let userType;


    userFound = await clientModel.findOne({email});
        if(userFound){
            userType = "client";
        } else {
            userFound = await employeeModel.findOne({email});
            if(userFound){
                userType= "employee"
            }
        }

        if (!userFound) {
            return res.json ({ message : "User not found "});

        }
    
        //Generar un codigo aleatorio
        const code = Math.floor(10000 + Math.random() * 90000).toString();

        //Guardar todo en un token
        const token = jsonwebtoken.sign(
            {email, code, userType, verified: false},
            config.JWT.secret,
            {expiresIn: "20m"}


        )

        res.cookie("tokenRecoveryCode", token, {maxAge: 20*60*1000})


        await sendEmail(
            email,
            "password recovery code",
            `Your verification code is: ${code}`,
            HTMLRecoveryEmail(code)
        )

        res.json({message: "Verification code sent"});



 } catch (error) {
    console.log("error"+ error);
 }
};


recoveryPasswordController.verifyCode = async (req, res) => {
    const {code} = req.body;
 
 
    try {
        const token = req.cookies.tokenRecoveryCode;
        //Extraer el código del token
 
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        //Compartir 1 el codigo que el usuario escribe
        //con el codigo que tengo guardado en el token 
        if (decoded.code !== code){
           return res.json({message: "Invalid code"})
        }

        const newToken = jsonwebtoken.sign(
            {email: decoded.email,
                code:decoded.code,
                userType: decoded.userType,
                verified: true
            },
            config.JWT.secret,
            {expiresIn: "20m"}
        
        )
        res.cookie("tokenRecoveryCode", newToken, {maxAge: 20*60*1000})
        res.json({message: "Code verified successfully"})
       
 
 
    } catch (error) {
       console.log("error" + error)
    }
}

recoveryPasswordController.newPassword = async(req, res)=>{
const {newPassword} = req.body;

try {
    
    //1- Extraer el metodo de las cookies
    const token = req.cookies.tokenRecoveryCode

    //2- Extraer la informacion del token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret)

    //3- Comprobar si el codigo no fue verificado
    if(!decoded.verified){
        return res.json({message: "Code not verified"})
    }

    //Extraer el email y el userType
    const {email, userType} = decoded;

    const hashedPassword = await .hash(newPassword, 10);

    let updateUser 

    //Ultimo paso - Actualizar la contrapassword
    if (userType === "client"){
        updateUser = await clientModel.findOneAndUpdate(
            {email},
            {password: hashedPassword},
            {new: true}
        )
    }else if(userType === "employee"){
        updateUser = await employeeModel.findOneAndUpdate(
            {email},
            {password: hashedPassword},
            {new: true}
        )
    }


    //Eliminar el token
    res.clearCookie("tokenRecoveryCode");

    res.json({message: "Password updated successfully"});
} catch (error) {
    console.log("error" + error);
}

};

export default recoveryPasswordController;
