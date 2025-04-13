const express = require("express");
const router = express.Router();
const { registrarUsuario, obtenerUsuarios, loginUsuario, actualizarUsuario } = require("../controllers/userController");
const { verificarTokenUsuario } = require("../controllers/userController");
const verificarToken = require("../middlewares/authMiddleware");

router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);
router.post("/", obtenerUsuarios);
router .get ("/verifytoken", verificarToken, verificarTokenUsuario);
router.put("/update", verificarToken, actualizarUsuario)

module.exports = router;