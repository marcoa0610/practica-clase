/*
    Coleccion: Sales
    product 
    category
    customer
    total
    date
*/

import {model, Schema} from "mongoose";

const salesSchema = new Schema(
    {
        product: {
           type: String,
            requierd: true
        },
        category: {
            type: String,
            requierd: true
        },
        customer: {
            type: String,
            requierd: true
        },
        total: {
            type: Number,
            requierd:true ,
            min: 0.01,
            max: 1000
        },
        date:{
            type:Date,
            requierd: true
        },
    },
    {
        timestamps: true,
        strict: false
    }

);
export default model("sales", salesSchema)
