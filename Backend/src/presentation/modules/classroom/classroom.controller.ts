import { Request, Response } from "express";
import { CreateClassroomDTO } from "../../../domain/dtos/create-classroom.dto";
import { UpdateClassroomDTO } from "../../../domain/dtos/update-classroom.dto";
import { HandleError } from "../../../domain/errors/handle.error";
import { ClassroomService } from "./classroom.service";

export class ClassroomController {
  private readonly classroomService = new ClassroomService();

  getAllClassrooms = (_req: Request, res: Response): void => {
    this.classroomService.getAllClassrooms()
      .then((classrooms) => res.status(200).json(classrooms))
      .catch((error) => HandleError.error(error, res));
  };

  getClassroomById = (req: Request, res: Response): void => {
    const id = this.getId(req, res);
    if (id === undefined) return;

    this.classroomService.getClassroomById(id)
      .then((classroom) => {
        if (!classroom) {
          res.status(404).json({ error: "No existe un aula con ese id" });
          return;
        }
        res.status(200).json(classroom);
      })
      .catch((error) => HandleError.error(error, res));
  };

  createClassroom = (req: Request, res: Response): void => {
    const [error, classroomDTO] = CreateClassroomDTO.create(req.body);
    if (error || !classroomDTO) {
      res.status(400).json({ error: error ?? "Datos inválidos" });
      return;
    }

    this.classroomService.createClassroom(classroomDTO)
      .then((classroom) => res.status(201).json(classroom))
      .catch((error) => HandleError.error(error, res));
  };

  updateClassroom = (req: Request, res: Response): void => {
    const id = this.getId(req, res);
    if (id === undefined) return;

    const [error, classroomDTO] = UpdateClassroomDTO.create(req.body);
    if (error || !classroomDTO) {
      res.status(400).json({ error: error ?? "Datos inválidos" });
      return;
    }

    this.classroomService.updateClassroom(id, classroomDTO)
      .then((classroom) => res.status(200).json(classroom))
      .catch((error) => HandleError.error(error, res));
  };

  deleteClassroom = (req: Request, res: Response): void => {
    const id = this.getId(req, res);
    if (id === undefined) return;

    this.classroomService.deleteClassroom(id)
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
