import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { Classroom } from '../../interfaces/classroom';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-list-classrooms',
  templateUrl: './list-classrooms.html',
})
export class ListClassrooms {
  classrooms: Classroom[] = [];

  private readonly router = inject(Router);
  private readonly classroomService = inject(ClassroomService);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
    this.loadClassrooms();
  }

  loadClassrooms(): void {
    this.classroomService.getAll().subscribe({
      next: (classrooms) => (this.classrooms = classrooms),
      error: () => this.alertService.toast('Error al consultar los salones', 'error'),
    });
  }

  createClassroom(): void {
    this.router.navigateByUrl('/classrooms/create');
  }

  viewClassroom(id: number): void {
    this.router.navigateByUrl(`/classrooms/detail/${id}`);
  }

  editClassroom(id: number): void {
    this.router.navigateByUrl(`/classrooms/edit/${id}`);
  }

  async deleteClassroom(classroom: Classroom): Promise<void> {
    const confirmed = await this.alertService.confirm(
      '¿Eliminar salón?',
      `Se eliminará el salón ${classroom.code}.`,
      'Eliminar',
    );
    if (!confirmed) return;

    this.classroomService.delete(classroom.id).subscribe({
      next: () => {
        this.alertService.toast('Salón eliminado correctamente', 'success');
        this.loadClassrooms();
      },
      error: () => this.alertService.toast('Error al eliminar el salón', 'error'),
    });
  }
}
