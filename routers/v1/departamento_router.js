const router = require('express').Router();

const { roleAuth } = require("../../middlewares/middleware_auth");


const {
  guardar,
  listar,
  actualizar,
} = require("../../controller/departamento_controller");

/**
 * @swagger
 * /departamento:
 *   post:
 *     summary: Crear Departamento
 *     tags: [Departamento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/departamento"
 *     responses:
 *       200: 
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/departamento"
 *       500:
 *         description: Usuario o Rol no Autorizado    
 */
router.post("/departamento", roleAuth(["ADMIN_ROLE"]), guardar);

/**
 * @swagger
 * /departamento:
 *   get:
 *     summary: Listar Departamento
 *     tags: [Departamento]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/departamento"
 *     responses:
 *       200: 
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/departamento"
 *       500:
 *         description: Usuario o Rol no Autorizado    
 */
router.get("/departamento", roleAuth(["ADMIN_ROLE", "USER_ROLE" ]), listar);
router.put("/departamento/:id", roleAuth(["ADMIN_ROLE"]), actualizar);

/**
 * @swagger
 * components:
 *   schemas:
 *     departamento:
 *       type: object
 *       required:
 *         - departamento_nombre
 *       properties:
 *         departamento_nombre:
 *            type: string
 *         status:
 *            type: boolean
 *            default: true
 *       example:
 *         departamento_nombre: Finanzas
 *         status: true      
 */


module.exports = router;
