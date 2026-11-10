/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       description: Representa un usuario del sistema
 *       required:
 *         - id
 *         - name
 *         - lastname
 *         - age
 *         - email
 *         - engineering
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Carlos
 *         lastname:
 *           type: string
 *           example: Ramírez
 *         age:
 *           type: number
 *           example: 22
 *         email:
 *           type: string
 *           format: email
 *           example: carlos.ramirez@example.com
 *         engineering:
 *           type: string
 *           enum:
 *             - Sistemas
 *             - Electronica
 *             - Biomedica
 *             - Industrial
 *             - Ambiental
 *           example: Sistemas
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       description: Representa un producto del sistema
 *       required:
 *         - id
 *         - name
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Leche entera
 *         category:
 *           type: string
 *           enum:
 *             - Lacteos
 *             - Carnes
 *             - Frutas
 *             - Verduras
 *           example: Lacteos
 *         price:
 *           type: number
 *           example: 4500
 */
export {};

/**
 * @openapi
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - specialty
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *           example: 1
 *         name:
 *           type: string
 *           maxLength: 100
 *           example: Ana Maria Restrepo
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 150
 *           example: ana.restrepo@uceva.edu.co
 *         phone:
 *           type: string
 *           maxLength: 15
 *           example: "3151234567"
 *         specialty:
 *           type: string
 *           maxLength: 100
 *           example: Ingenieria de Software
 *         status:
 *           type: boolean
 *           example: true
 *     Classroom:
 *       type: object
 *       required:
 *         - code
 *         - building
 *         - capacity
 *         - type
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *           example: 1
 *         code:
 *           type: string
 *           maxLength: 20
 *           example: A-101
 *         building:
 *           type: string
 *           maxLength: 100
 *           example: Bloque A
 *         capacity:
 *           type: integer
 *           minimum: 1
 *           maximum: 500
 *           example: 35
 *         type:
 *           type: string
 *           maxLength: 30
 *           example: Aula
 *         status:
 *           type: boolean
 *           example: true
 */