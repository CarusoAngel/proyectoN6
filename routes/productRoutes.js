const express = require("express");
const router = express.Router();
const {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProductoPorId,
} = require("../controllers/productController");

// Ruta para crear un producto
router.post("/create", crearProducto);

// Obtener todos los productos 
router.get("/all", obtenerProductos);

// Obtener prodcutos por ID
router.get("/:id", obtenerProductoPorId);

//Actualizar prodcuto
router.put("/:id", actualizarProducto);

// Eliminar producto por ID
router.delete("/:id", eliminarProductoPorId);

module.exports = router;