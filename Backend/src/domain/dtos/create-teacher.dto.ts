import { CreateTeacher } from "../interfaces/teacher.interface";

export class CreateTeacherDTO implements CreateTeacher {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly specialty: string,
    public readonly status: boolean,
  ) {}

  static create(
    object: Record<string, unknown> | null | undefined = {},
  ): [string | undefined, CreateTeacherDTO?] {
    if (!object || Array.isArray(object)) return ["Request body must be an object"];
    const { name, email, phone, specialty, status } = object;

    if (typeof name !== "string" || !name.trim()) return ["Missing name"];
    if (typeof email !== "string" || !email.trim()) return ["Missing email"];
    if (typeof phone !== "string" || !phone.trim()) return ["Missing phone"];
    if (typeof specialty !== "string" || !specialty.trim()) return ["Missing specialty"];
    if (typeof status !== "boolean") return ["Invalid status"];

    const normalizedEmail = email.trim();
    const normalizedPhone = phone.trim();
    if (name.trim().length > 100) return ["name is too large, max length is 100 characters"];
    if (normalizedEmail.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return ["Invalid email"];
    }
    if (!/^\d{7,15}$/.test(normalizedPhone)) return ["Invalid phone"];
    if (specialty.trim().length > 100) return ["specialty is too large, max length is 100 characters"];

    return [
      undefined,
      new CreateTeacherDTO(name.trim(), normalizedEmail, normalizedPhone, specialty.trim(), status),
    ];
  }
}
