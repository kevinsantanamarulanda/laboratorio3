import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { Classroom, CreateClassroom, UpdateClassroom } from "../../../domain/interfaces/classroom.interface";

export class ClassroomService {
  public async getAllClassrooms(): Promise<Classroom[]> {
    const sql = "SELECT * FROM classrooms ORDER BY id;";
    return (await pool.query<Classroom>(sql)).rows;
  }

  public async getClassroomById(id: number): Promise<Classroom | null> {
    const sql = "SELECT * FROM classrooms WHERE id = $1;";
    const classroom = (await pool.query<Classroom>(sql, [id])).rows[0];
    return classroom ?? null;
  }

  public async createClassroom(classroom: CreateClassroom): Promise<Classroom> {
    const sql = `
      INSERT INTO classrooms (code, building, capacity, type, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    try {
      const result = await pool.query<Classroom>(sql, [
        classroom.code,
        classroom.building,
        classroom.capacity,
        classroom.type,
        classroom.status,
      ]);
      const createdClassroom = result.rows[0];
      if (!createdClassroom) throw CustomError.internalServer("No se pudo crear el aula");
      return createdClassroom;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  public async updateClassroom(id: number, classroom: UpdateClassroom): Promise<Classroom> {
    const sql = `
      UPDATE classrooms
      SET code = $1, building = $2, capacity = $3, type = $4, status = $5
      WHERE id = $6
      RETURNING *;
    `;

    try {
      const result = await pool.query<Classroom>(sql, [
        classroom.code,
        classroom.building,
        classroom.capacity,
        classroom.type,
        classroom.status,
        id,
      ]);
      const updatedClassroom = result.rows[0];
      if (!updatedClassroom) throw CustomError.notFound("No existe un aula con ese id");
      return updatedClassroom;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  public async deleteClassroom(id: number): Promise<boolean> {
    const sql = "DELETE FROM classrooms WHERE id = $1 RETURNING id;";

    try {
      const result = await pool.query(sql, [id]);
      if (result.rowCount === 0) throw CustomError.notFound("No existe un aula con ese id");
      return true;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  private handleDatabaseError(error: unknown): never {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      throw CustomError.conflict("Ya existe un aula con ese código");
    }
    throw error;
  }
}
