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
import logoutRoute from "./src/routes/logout.js"
import registerClientsRoutes from "./src/routes/registerClients.js"
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js"
import providersRoutes from "./src/routes/providers.js"
import brandsRoutes from "./src/routes/brands.js"
import faqsRoutes from "./src/routes/faqs.js"
import tasks from "./src/routes/taks.js"
import salesRoutes from "./src/routes/sales.js"


//Creo una const que es igual a la libreria "express"
//acabo de importar y lo ejecuto
const app = express();
import swaggerUi from "swagger-ui-express";
import cors from "cors"
import fs from "fs";
import path from "path"


 
app.use(
  cors({
    origin: "https://practica-clase-ten.vercel.app",
    // Permitir envío de cookies y credenciales
    credentials: true
  })
);

// middleware para aceptar datos desde postman
app.use(express.json());
app.use(cookieParser());


const swaggerDocument = JSON.parse(
fs.readFileSync(path.resolve("./documentacionEPAv4.json"), "utf-8")
);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Rutas de la API
app.use("/api/product", productsRoutes);
app.use("/api/branch", branchesRoutes); // Cambiado de /api/sucursales a /api/branch para consistencia
app.use("/api/client", clientRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/registerEmployee", registerEmployeeRoutes);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute); // Corregido: faltaba el "/"
app.use("/api/registerClients", registerClientsRoutes);
app.use("/api/RecoveryPassword", recoveryPasswordRoutes);
app.use("/api/providers", providersRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/faqs", faqsRoutes);
app.use("/api/tasks", tasks);
app.use("/api/sales", salesRoutes);

//Exporto toda la constante para poder usar express en otros archivos
export default app;