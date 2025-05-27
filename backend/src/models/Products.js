import { Schema, model } from "mongoose";

const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: { // <- corregido
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: { // <- esto ahora se guardará bien
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true,
    strict: false
  }
);

export default model("Product", productsSchema);
