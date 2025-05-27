/*
    Campos: 
    name
    address
    telephone
    schedule
*/

import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la sucursal es requerido'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder 100 caracteres']
    },
    telephone: {
        type: String,
        required: [true, 'El teléfono es requerido'],
        trim: true,
        maxlength: [20, 'El teléfono no puede exceder 20 caracteres']
    },
    address: {
        type: String,
        required: [true, 'La dirección es requerida'],
        trim: true,
        maxlength: [500, 'La dirección no puede exceder 500 caracteres']
    },
    schedule: {
        type: String,
        required: [true, 'El horario es requerido'],
        trim: true,
        maxlength: [100, 'El horario no puede exceder 100 caracteres']
    }
}, {
    timestamps: true // Esto agrega createdAt y updatedAt automáticamente
});

// Índices para mejorar performance en búsquedas
branchSchema.index({ name: 1 });

const branchesModel = mongoose.model('Branch', branchSchema);

export default branchesModel;