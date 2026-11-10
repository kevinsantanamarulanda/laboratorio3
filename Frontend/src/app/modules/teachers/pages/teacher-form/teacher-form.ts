import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateTeacherRequest, Teacher } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-teacher-form',
  imports: [ReactiveFormsModule],
  templateUrl: './teacher-form.html',
})
export class TeacherForm {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly alertService = inject(AlertService);
  private readonly teacherService = inject(TeacherService);

  id: number | null = null;
  get isEditing(): boolean {
    return this.id !== null;
  }

  teacherForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
    specialty: ['', [Validators.required, Validators.maxLength(100)]],
    status: [true],
  });

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId === null) return;

    const id = Number(paramId);
    if (!Number.isSafeInteger(id) || id < 1) {
      this.alertService.toast('Identificador de docente no válido', 'error');
      this.goToList();
      return;
    }

    this.id = id;
    this.teacherService.getById(id).subscribe({
      next: (teacher) => this.setValues(teacher),
      error: () => {
        this.alertService.toast('Error al consultar el docente', 'error');
        this.goToList();
      },
    });
  }

  saveTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }

    const teacher: CreateTeacherRequest = {
      ...this.teacherForm.getRawValue(),
      name: this.teacherForm.controls.name.value.trim(),
      email: this.teacherForm.controls.email.value.trim(),
      phone: this.teacherForm.controls.phone.value.trim(),
      specialty: this.teacherForm.controls.specialty.value.trim(),
    };

    const request = this.id === null
      ? this.teacherService.create(teacher)
      : this.teacherService.update(this.id, teacher);

    request.subscribe({
      next: () => {
        this.alertService.toast(
          this.isEditing ? 'Docente actualizado correctamente' : 'Docente registrado correctamente',
          'success',
        );
        this.goToList();
      },
      error: () => this.alertService.toast('Error al guardar el docente', 'error'),
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/teachers');
  }

  private setValues(teacher: Teacher): void {
    this.teacherForm.patchValue({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      specialty: teacher.specialty,
      status: teacher.status,
    });
  }
}
