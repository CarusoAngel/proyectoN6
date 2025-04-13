const bcrypt = require("bcryptjs");
const Usuario = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Registrar nuevo usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

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

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ msg: "Error al obtener los usuarios", error: error.message });
    }
};

// Login de usuario
const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    // Generar token
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      msg: "Login exitoso",
      token,
});
  } catch (error) {
    res.status(500).json({ msg: "Error al iniciar sesión", error: error.message });
    }
};

// Verificar Token usuaritio 

const verificarTokenUsuario = (req, res) => {
  res.status(200).json({ msg: "Token válido", usuario: req.usuario });
};

// Actualizar usuario 

const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const usuario = await Usuario.findById(req.usuario.id);

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(password, salt);
    }

    await usuario.save();

    res.status(200).json({ msg: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar usuario", error: error.message });
  }
};


module.exports = {
  registrarUsuario,
  obtenerUsuarios,
  loginUsuario,
  verificarTokenUsuario,
  actualizarUsuario,
};