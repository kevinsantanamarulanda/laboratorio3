import { Router } from "express";
import { TeacherController } from "./teacher.controller";

/**
 * @openapi
 * tags:
 *   - name: Teachers
 *     description: CRUD de docentes
 * /api/teachers:
 *   get:
 *     tags: [Teachers]
 *     summary: Consultar todos los docentes
 *     responses:
 *       200:
 *         description: Lista de docentes
 *   post:
 *     tags: [Teachers]
 *     summary: Crear un docente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: Docente creado
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Correo o teléfono duplicado
 * /api/teachers/{id}:
 *   get:
 *     tags: [Teachers]
 *     summary: Consultar un docente por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Docente encontrado
 *       404:
 *         description: Docente no encontrado
 *   put:
 *     tags: [Teachers]
 *     summary: Actualizar un docente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Docente actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Docente no encontrado
 *       409:
 *         description: Correo o teléfono duplicado
 *   delete:
 *     tags: [Teachers]
 *     summary: Eliminar un docente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Docente eliminado
 *       404:
 *         description: Docente no encontrado
 */
export class TeacherRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new TeacherController();

    router.get("/", controller.getAllTeachers);
    router.get("/:id", controller.getTeacherById);
    router.post("/", controller.createTeacher);
    router.put("/:id", controller.updateTeacher);
    router.delete("/:id", controller.deleteTeacher);

    return router;
  }
}
