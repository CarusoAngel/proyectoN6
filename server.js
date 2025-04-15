const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger");

// Configuración de variables de entorno
dotenv.config();

// Inicializa Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connectar rutas de usuario
const userRoutes = require ("./routes/userRoutes");
app.use("/api/v1/user", userRoutes);

// Conectar rutas de producftos 
const productRoutes = require("./routes/productRoutes");
app.use("/api/v1/product", productRoutes);

// Conexión a MongoDB
connectDB();

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

// Levanta el servidor
const PORT = process.env.PORT || 3000;
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
