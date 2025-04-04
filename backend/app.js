//Importar todo lo de la libreria "express"

import express from "express";
import productsRoutes from "./src/routes/products.js"
import branchesRoutes from "./src/routes/branches.js"
import clientRoutes from "./src/routes/clients.js"
import employeeRoutes from "./src/routes/employees.js"
import reviewRoutes from "./src/routes/reviews.js"
import registerEmployeeRoutes from "./src/routes/registerEmployee.js";
import cookieParser from "cookie-parser";
import loginRoute from "./src/routes/login.js"


//Creo una const que es igual a la libreria "express"
//acabo de importar y lo ejecuto
const app = express();
// middleware para aceptar datos desde postman
app.use(express.json());
app.use(cookieParser());
app.use("/api/product", productsRoutes);
app.use("/api/branch", branchesRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/registerEmployee", registerEmployeeRoutes)
app.use("/api/login", loginRoute)


//Exporto toda la constante para poder usar express en otros archivos

export default app;