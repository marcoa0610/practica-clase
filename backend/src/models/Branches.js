/*
    Campos: 
    name
    address
    telephone
    schedule
*/

import { Schema, model } from "mongoose";

const branchesSchema = new Schema(
    {

        name: {
            type: String,
            require: true
        },
        adress: {
            type: String,
            require: true
        },
        telephone: {
            type: String,
            require: true,
        },
        schedule:{
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
        strict: false
    }
    
);

export default model("Branch", branchesSchema)