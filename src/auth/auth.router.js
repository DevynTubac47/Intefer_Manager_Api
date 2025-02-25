import { Router } from "express"
import { login } from "./auth.controller.js"
import { loginValidator } from "../middlewares/user-validators.js"

const router = Router()

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite a un usuario iniciar sesión con sus credenciales.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del usuario.
 *                 example: usuario123
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: contraseña123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Error en la solicitud.
 *       401:
 *         description: Credenciales inválidas.
 */

router.post("/login", loginValidator, login)

export default router
