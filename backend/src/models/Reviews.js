/*
    Campos: 
    Rating
    Comments
    idClient

*/

import { Schema, model } from "mongoose";


const reviewSchema = new Schema(

    {
        Comment:{
            type: String,
            
        },
        rating: {
            type: Number,
            max: 5,
        },
        idClient: {
            type: Schema.Types.ObjectId,
            ref: "Client",
            require: true,
        },
    },

    {
        timestamps: true,
        strict: false
    }
);

export default model("review", reviewSchema)
