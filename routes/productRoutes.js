const express = require("express");
const router = express.Router();
const {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProductoPorId,
} = require("../controllers/productController");

const verificarToken = require("../middlewares/authMiddleware");

// Crear un producto
router.post("/", verificarToken, crearProducto);

// Obtener todos los productos 
router.get("/", obtenerProductos);

// Obtener prodcutos por ID
router.get("/:id", obtenerProductoPorId);

// Actualizar producto
router.put("/:id", verificarToken, actualizarProducto);

// Eliminar producto por ID
router.delete("/:id", verificarToken, eliminarProductoPorId);

module.exports = router;