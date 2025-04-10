import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import clientsModel from "../models/Clients.js"
import { config } from "../config.js";
import { error } from "console";

//creo un array de funciones

const registerClientsController = {};

registerClientsController.register = async (req, res)=>{
    const {
        name,
        lastName,
        birthday,
        email,
        password,
        telephone,
        dui,
        isVerified,
    } = req.body;

    try {
        
        const existClient = await clientsModel.findOne({email})
        if (existClient){
            return res.json({message: "Client already exists"})
        }

        const passwordHash = await bcryptjs.hash(password, 10)

        const newClient = new clientsModel({
            name,
        lastName,
        birthday,
        email,
        password: passwordHash,
        telephone,
        dui: dui || null,
        isVerified: isVerified || false,
        })

        await newClient.save();

        // Generar un código aleatorio 
        const verificationCode = crypto.randomBytes(3).toString("hex")

        //Genero un token para guardar el codigo aleatorio 
        const tokenCode = jsonwebtoken.sign(
            //1-  ¿Que vamos a guardar?
            {email, verificationCode},

            //2- Scret key
            config.JWT.secret,
            //3-  Cuando expira 
            {expiresIn: "2h"}
        )
        

        res.cookie ("verificationToken", tokenCode, {maxAge : 2*60*60*1000})

        //Enviar correo 

        //1- Transporter => Quien lo envia
        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.emailUser.user_email,
                pass: config.emailUser.user_pass
            }
        })

        //
        const mailOptions = {
            from: config.emailUser.user_email,
            to: email,
            subject: "Verificacion de cuenta",
            text: "Para verificar tu cuenta, utiliza este codigo : " + verificationCode + " Expira en dos horas"
        }

        Transporter.sendMail(mailOptions, (error, info) =>{
            if(error) console.log ("error"+ error)
            res.json({message: "Email sent" + info})
        })

        


    } catch (error) {
        console.log("error"+error)
        res.json ({message: "Error"+ error});
    }

};



//////////////////////////////Verificar codigo


    //1- obtener el token
    registerClientsController.verifyCodeEmail = async(req, res) => {
        const {verificationCodeRequest} = req.body;
     
        //1- Obtener el token
     
        const token = req.cookies.verificationToken
     
        //2- Verificar y decodificar el token
     
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
     
        const {email, verificationCode: storedCode} = decoded
     
        //3- Comparar los códigos
        if(verificationCodeRequest !== storedCode) {
            return res.json({message:"Invalid code"})
        }


        //Si el codigo es igual, entonces, colocamos el campo "is verified" en true
        const client = await clientsModel.findOne({email});
        client.isVerified = true;
        await client.save();

        res.clearCookie("verificationToken");

        res.json({message: "Email verified Successfully"});
    };

    export default registerClientsController;