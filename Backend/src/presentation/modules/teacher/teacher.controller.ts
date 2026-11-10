import { Request, Response } from "express";
import { CreateTeacherDTO } from "../../../domain/dtos/create-teacher.dto";
import { UpdateTeacherDTO } from "../../../domain/dtos/update-teacher.dto";
import { HandleError } from "../../../domain/errors/handle.error";
import { TeacherService } from "./teacher.service";

export class TeacherController {
  private readonly teacherService = new TeacherService();

  getAllTeachers = (_req: Request, res: Response): void => {
    this.teacherService.getAllTeachers()
      .then((teachers) => res.status(200).json(teachers))
      .catch((error) => HandleError.error(error, res));
  };

  getTeacherById = (req: Request, res: Response): void => {
    const id = this.getId(req, res);
    if (id === undefined) return;

    this.teacherService.getTeacherById(id)
      .then((teacher) => {
        if (!teacher) {
          res.status(404).json({ error: "No existe un docente con ese id" });
          return;
        }
        res.status(200).json(teacher);
      })
      .catch((error) => HandleError.error(error, res));
  };

  createTeacher = (req: Request, res: Response): void => {
    const [error, teacherDTO] = CreateTeacherDTO.create(req.body);
    if (error || !teacherDTO) {
      res.status(400).json({ error: error ?? "Datos inválidos" });
      return;
    }

    this.teacherService.createTeacher(teacherDTO)
      .then((teacher) => res.status(201).json(teacher))
      .catch((error) => HandleError.error(error, res));
  };

  updateTeacher = (req: Request, res: Response): void => {
    const id = this.getId(req, res);
    if (id === undefined) return;

    const [error, teacherDTO] = UpdateTeacherDTO.create(req.body);
    if (error || !teacherDTO) {
      res.status(400).json({ error: error ?? "Datos inválidos" });
      return;
    }

    this.teacherService.updateTeacher(id, teacherDTO)
      .then((teacher) => res.status(200).json(teacher))
      .catch((error) => HandleError.error(error, res));
  };

  deleteTeacher = (req: Request, res: Response): void => {
    const id = this.getId(req, res);
    if (id === undefined) return;

    this.teacherService.deleteTeacher(id)
      .then((result) => res.status(200).json({ result }))
      .catch((error) => HandleError.error(error, res));
  };

  private getId(req: Request, res: Response): number | undefined {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) {
      res.status(400).json({ error: "El id debe ser un entero positivo" });
      return undefined;
    }
    return id;
  }
}
