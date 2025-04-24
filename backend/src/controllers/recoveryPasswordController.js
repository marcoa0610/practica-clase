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
        const code = Math.floor(10000 + Math.random() * 90000).toString

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


export default recoveryPasswordController;
