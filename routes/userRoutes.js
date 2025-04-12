const express = require("express");
const router = express.Router();
const { registrarUsuario, obtenerUsuarios, loginUsuario } = require("../controllers/userController");

router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);
router.post("/", obtenerUsuarios);

module.exports = router;