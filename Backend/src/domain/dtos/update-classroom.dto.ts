import { UpdateClassroom } from "../interfaces/classroom.interface";

export class UpdateClassroomDTO implements UpdateClassroom {
  private constructor(
    public readonly code: string,
    public readonly building: string,
    public readonly capacity: number,
    public readonly type: string,
    public readonly status: boolean,
  ) {}

  static create(
    object: Record<string, unknown> | null | undefined = {},
  ): [string | undefined, UpdateClassroomDTO?] {
    if (!object || Array.isArray(object)) return ["Request body must be an object"];
    const { code, building, capacity, type, status } = object;

    if (typeof code !== "string" || !code.trim()) return ["Missing code"];
    if (typeof building !== "string" || !building.trim()) return ["Missing building"];
    if (typeof capacity !== "number" || !Number.isInteger(capacity) || capacity < 1 || capacity > 500) {
      return ["Invalid capacity; it must be an integer between 1 and 500"];
    }
    if (typeof type !== "string" || !type.trim()) return ["Missing type"];
    if (typeof status !== "boolean") return ["Invalid status"];

    if (code.trim().length > 20) return ["code is too large, max length is 20 characters"];
    if (building.trim().length > 100) return ["building is too large, max length is 100 characters"];
    if (type.trim().length > 30) return ["type is too large, max length is 30 characters"];

    return [
      undefined,
      new UpdateClassroomDTO(code.trim(), building.trim(), capacity, type.trim(), status),
    ];
  }
}
