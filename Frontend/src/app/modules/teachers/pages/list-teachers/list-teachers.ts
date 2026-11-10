import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { Teacher } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.html',
})
export class ListTeachers {
  teachers: Teacher[] = [];

  private readonly router = inject(Router);
  private readonly teacherService = inject(TeacherService);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getAll().subscribe({
      next: (teachers) => (this.teachers = teachers),
      error: () => this.alertService.toast('Error al consultar los docentes', 'error'),
    });
  }

  createTeacher(): void {
    this.router.navigateByUrl('/teachers/create');
  }

  viewTeacher(id: number): void {
    this.router.navigateByUrl(`/teachers/detail/${id}`);
  }

  editTeacher(id: number): void {
    this.router.navigateByUrl(`/teachers/edit/${id}`);
  }

  async deleteTeacher(teacher: Teacher): Promise<void> {
    const confirmed = await this.alertService.confirm(
      '¿Eliminar docente?',
      `Se eliminará a ${teacher.name}.`,
      'Eliminar',
    );
    if (!confirmed) return;

    this.teacherService.delete(teacher.id).subscribe({
      next: () => {
        this.alertService.toast('Docente eliminado correctamente', 'success');
        this.loadTeachers();
      },
      error: () => this.alertService.toast('Error al eliminar el docente', 'error'),
    });
  }
}
