const express = require("express");
const router = express.Router();
const { registrarUsuario, obtenerUsuarios, loginUsuario, actualizarUsuario } = require("../controllers/userController");
const { verificarTokenUsuario } = require("../controllers/userController");
const verificarToken = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error de validación o correo duplicado
 */
router.post("/register", registrarUsuario);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Iniciar sesión y obtener token
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Credenciales inválidas
 */
router.post("/login", loginUsuario);

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Error del servidor
 */
router.get("/", obtenerUsuarios);

/**
 * @swagger
 * /api/v1/user/verifytoken:
 *   get:
 *     summary: Verificar token de autenticación
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido o ausente
 */
router .get ("/verifytoken", verificarToken, verificarTokenUsuario);

/**
 * @swagger
 * /api/v1/user/update:
 *   put:
 *     summary: Actualizar datos del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Error de validación o correo duplicado
 *       401:
 *         description: Token inválido o ausente
 */
router.put("/update", verificarToken, actualizarUsuario)

module.exports = router;