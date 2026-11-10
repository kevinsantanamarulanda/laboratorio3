import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { Classroom } from '../../interfaces/classroom';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-detail-classroom',
  templateUrl: './detail-classroom.html',
})
export class DetailClassroom {
  classroom: Classroom | null = null;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly classroomService = inject(ClassroomService);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isSafeInteger(id) || id < 1) {
      this.alertService.toast('Identificador de salón no válido', 'error');
      this.goToList();
      return;
    }

    this.classroomService.getById(id).subscribe({
      next: (classroom) => (this.classroom = classroom),
      error: () => {
        this.alertService.toast('Error al consultar el salón', 'error');
        this.goToList();
      },
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/classrooms');
  }

  editClassroom(): void {
    if (this.classroom) this.router.navigateByUrl(`/classrooms/edit/${this.classroom.id}`);
  }
}
