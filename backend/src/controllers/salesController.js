import sales from "../models/sales.js";
import salesModel from "../models/sales.js"

//Array de funciones
const salesController = {};

salesController.getSalesByCategory = async(req,res)=>{
    try {
        const resultado = await salesModel.aggregate(
            [
                {
                    $group:{
                        _id: "$category",
                        totalVentas: {$sum: "$total"}
                    }
                },
                //Ordenar los resultados
                {
                    $sort: {totalVentas: -1}
                }
            ]
        )

        res.status(200).json(resultado);
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "internal server error"})
    }
};

salesController.getBestSellingProducts = async (req, res) =>{
    try {
        const resultado = await salesModel.aggregate(
            [
            {
                $group: {
                    _id: "$product",
                    cantidadVentas: {$sum: 1}
                }
            }, 
            {
                $sort: { cantidadVentas: -1}
            },
            //limitar la cantidad de datos a mostrar
            {
                $limit: 5
            },
        ]);

        res.status(200).json(resultado);
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
        
    }
};

//Cliente con mas compras

salesController.getFrequentCustomer = async(req, res) =>{
    try {
        const resultado = await salesModel.aggregate(
            [
                {
                    $group: {
                        _id: "$customer",
                        comprasRealizadas: {$sum: 1}
                    }
                },
                {
                    $sort: {comprasRealizadas: -1}
                },
                {
                    $limit: 3
                }
            ]
        )

        res.status(200).json(resultado)
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
}

//Ganancias totales

salesController.totalEarnings = async (req, res) => {
    try {
        const resultado = await salesModel.aggregate(
            [
                {
                    $group: {
                        _id: null,
                        ganaciasTotales: {$sum: "$total"}
                    }
                }
            ]
        )

        res.status(200).json(resultado)
    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    
    }
};

//Ventas por fecha

salesController.getSalesByDate = async (req,res) => {
    try {
        const resultado = await salesModel.aggregate(
            [
                {
                    $group:{
                        _id:{
                            anio: {$year: "$fecha"},
                            mes: {$month: "$fecha"}
                        },
                        totalVentas: {$sum: "$total"}

                    }
                },
                {
                    $sort: {
                        totalVentas: -1
                    }
                }
            ]
        );
        res.status(200).json(resultado)

    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
};

//Insertar ventas
salesController.insertSales = async(req,res)=>{
    try {
        const {product, category, customer, total, date} = req.body
        const newSale = new salesModel({
            product,
            category,
            customer,
            total,
            date
        });
        await newSale.save();

        res.status(200).json("Sales saved")

    } catch (error) {
        console.log("error"+error)
        res.status(500).json({message: "Internal server error"})
    }
};

export default salesController;