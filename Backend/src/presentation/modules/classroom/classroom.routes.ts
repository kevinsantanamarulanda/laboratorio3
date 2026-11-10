import { Router } from "express";
import { ClassroomController } from "./classroom.controller";

/**
 * @openapi
 * tags:
 *   - name: Classrooms
 *     description: CRUD de aulas
 * /api/classrooms:
 *   get:
 *     tags: [Classrooms]
 *     summary: Consultar todas las aulas
 *     responses:
 *       200:
 *         description: Lista de aulas
 *   post:
 *     tags: [Classrooms]
 *     summary: Crear un aula
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Classroom'
 *     responses:
 *       201:
 *         description: Aula creada
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Código de aula duplicado
 * /api/classrooms/{id}:
 *   get:
 *     tags: [Classrooms]
 *     summary: Consultar un aula por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aula encontrada
 *       404:
 *         description: Aula no encontrada
 *   put:
 *     tags: [Classrooms]
 *     summary: Actualizar un aula
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
 *             $ref: '#/components/schemas/Classroom'
 *     responses:
 *       200:
 *         description: Aula actualizada
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Aula no encontrada
 *       409:
 *         description: Código de aula duplicado
 *   delete:
 *     tags: [Classrooms]
 *     summary: Eliminar un aula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aula eliminada
 *       404:
 *         description: Aula no encontrada
 */
export class ClassroomRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ClassroomController();

    router.get("/", controller.getAllClassrooms);
    router.get("/:id", controller.getClassroomById);
    router.post("/", controller.createClassroom);
    router.put("/:id", controller.updateClassroom);
    router.delete("/:id", controller.deleteClassroom);

    return router;
  }
}
