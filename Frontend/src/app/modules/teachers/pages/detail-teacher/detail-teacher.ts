import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { Teacher } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-detail-teacher',
  templateUrl: './detail-teacher.html',
})
export class DetailTeacher {
  teacher: Teacher | null = null;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly teacherService = inject(TeacherService);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isSafeInteger(id) || id < 1) {
      this.alertService.toast('Identificador de docente no válido', 'error');
      this.goToList();
      return;
    }

    this.teacherService.getById(id).subscribe({
      next: (teacher) => (this.teacher = teacher),
      error: () => {
        this.alertService.toast('Error al consultar el docente', 'error');
        this.goToList();
      },
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/teachers');
  }

  editTeacher(): void {
    if (this.teacher) this.router.navigateByUrl(`/teachers/edit/${this.teacher.id}`);
  }
}
