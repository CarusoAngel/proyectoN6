const Producto = require("../models/productModel");

// Crear producto
const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, disponible } = req.body;

    if (!nombre || !descripcion || !precio) {
      return res.status(400).json({ msg: "Todos los campos obligatorios excepto disponible" });
    }

    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio,
      disponible
    });

    await nuevoProducto.save();

    res.status(201).json({ msg: "Producto creado correctamente", producto: nuevoProducto });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear producto", error: error.message });
  }
};

// Obetenre todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los productos", error: error.message });
  }
};

  // Obtener producto por ID
const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);
  
    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }
  
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener producto", error: error.message });
  }
};

// Actualizar un orodcuto por ID
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, disponible } = req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      { nombre, descripcion, precio, disponible },
      { new: true } 
    );

    if (!productoActualizado) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    res.status(200).json({ msg: "Producto actualizado correctamente", producto: productoActualizado });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar producto", error: error.message });
  }
};

// Eliminar producto por ID
const eliminarProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByIdAndDelete(id);

    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    res.status(200).json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar producto", error: error.message });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProductoPorId,
};