const bcrypt = require("bcryptjs");
const Usuario = require("../models/userModel");

// Registrar nuevo usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }
    
    // Verificar que todos los campos estén presentes
    if (!nombre || !email || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ msg: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: passwordEncriptada,
    });

    await nuevoUsuario.save();

    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

module.exports = {
  registrarUsuario,
};