import { Router } from "express";
import { generateReport, getCompanies, getCompanyByCategory, getCompanyByOrder, getCompanyByPath, registerCompany, updateCompany } from "./company.controller.js";
import { getCompanyByCategoryValidator, getCompanyByPathValidator, registerCompanyValidator, updateCompanyValidator } from "../middlewares/company-validators.js";

const router = Router();

/**
 * @swagger
 * /registerCompany:
 *   post:
 *     summary: Registrar una nueva empresa
 *     description: Permite registrar una nueva empresa en el sistema.
 *     tags:
 *       - Empresa
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: Empresa registrada exitosamente.
 *       400:
 *         description: Error en la solicitud.
 */
router.post("/registerCompany", registerCompanyValidator, registerCompany);

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Obtener todas las empresas
 *     description: Obtiene una lista de todas las empresas registradas.
 *     tags:
 *       - Empresa
 *     responses:
 *       200:
 *         description: Lista de empresas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */
router.get("/companies", getCompanies);

/**
 * @swagger
 * /companiesByTrayectory/{path}:
 *   get:
 *     summary: Obtener empresas por trayectoria
 *     description: Obtiene una lista de empresas filtradas por trayectoria.
 *     tags:
 *       - Empresa
 *     parameters:
 *       - in: path
 *         name: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Trayectoria de la empresa.
 *     responses:
 *       200:
 *         description: Lista de empresas filtradas por trayectoria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       400:
 *         description: Error en la solicitud.
 */
router.get("/companiesByTrayectory/:path", getCompanyByPathValidator, getCompanyByPath);

/**
 * @swagger
 * /companiesByCategory/{category}:
 *   get:
 *     summary: Obtener empresas por categoría
 *     description: Obtiene una lista de empresas filtradas por categoría.
 *     tags:
 *       - Empresa
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Categoría de la empresa.
 *     responses:
 *       200:
 *         description: Lista de empresas filtradas por categoría.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       400:
 *         description: Error en la solicitud.
 */
router.get("/companiesByCategory/:category", getCompanyByCategoryValidator, getCompanyByCategory);

/**
 * @swagger
 * /companies/order:
 *   get:
 *     summary: Obtener empresas ordenadas
 *     description: Obtiene una lista de empresas ordenadas.
 *     tags:
 *       - Empresa
 *     responses:
 *       200:
 *         description: Lista de empresas ordenadas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */
router.get("/companies/order", getCompanyByOrder);

/**
 * @swagger
 * /updateCompany/{id}:
 *   put:
 *     summary: Actualizar una empresa
 *     description: Permite actualizar la información de una empresa existente.
 *     tags:
 *       - Empresa
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Empresa actualizada exitosamente.
 *       400:
 *         description: Error en la solicitud.
 */
router.put("/updateCompany/:id", updateCompanyValidator, updateCompany);

/**
 * @swagger
 * /companies/report:
 *   get:
 *     summary: Generar reporte de empresas
 *     description: Genera un reporte de todas las empresas registradas.
 *     tags:
 *       - Empresa
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 report:
 *                   type: string
 *                   description: Reporte en formato JSON.
 *                   example: "Reporte de empresas..."
 */
router.get("/companies/report", generateReport);

export default router;
