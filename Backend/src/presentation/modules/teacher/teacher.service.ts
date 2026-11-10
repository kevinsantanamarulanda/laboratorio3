import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { CreateTeacher, Teacher, UpdateTeacher } from "../../../domain/interfaces/teacher.interface";

export class TeacherService {
  public async getAllTeachers(): Promise<Teacher[]> {
    const sql = "SELECT * FROM teachers ORDER BY id;";
    return (await pool.query<Teacher>(sql)).rows;
  }

  public async getTeacherById(id: number): Promise<Teacher | null> {
    const sql = "SELECT * FROM teachers WHERE id = $1;";
    const teacher = (await pool.query<Teacher>(sql, [id])).rows[0];
    return teacher ?? null;
  }

  public async createTeacher(teacher: CreateTeacher): Promise<Teacher> {
    const sql = `
      INSERT INTO teachers (name, email, phone, specialty, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    try {
      const result = await pool.query<Teacher>(sql, [
        teacher.name,
        teacher.email,
        teacher.phone,
        teacher.specialty,
        teacher.status,
      ]);
      const createdTeacher = result.rows[0];
      if (!createdTeacher) throw CustomError.internalServer("No se pudo crear el docente");
      return createdTeacher;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  public async updateTeacher(id: number, teacher: UpdateTeacher): Promise<Teacher> {
    const sql = `
      UPDATE teachers
      SET name = $1, email = $2, phone = $3, specialty = $4, status = $5
      WHERE id = $6
      RETURNING *;
    `;

    try {
      const result = await pool.query<Teacher>(sql, [
        teacher.name,
        teacher.email,
        teacher.phone,
        teacher.specialty,
        teacher.status,
        id,
      ]);
      const updatedTeacher = result.rows[0];
      if (!updatedTeacher) throw CustomError.notFound("No existe un docente con ese id");
      return updatedTeacher;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  public async deleteTeacher(id: number): Promise<boolean> {
    const sql = "DELETE FROM teachers WHERE id = $1 RETURNING id;";

    try {
      const result = await pool.query(sql, [id]);
      if (result.rowCount === 0) throw CustomError.notFound("No existe un docente con ese id");
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
      throw CustomError.conflict("El correo o teléfono ya está registrado");
    }
    throw error;
  }
}
