import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { Classroom, CreateClassroomRequest } from '../../interfaces/classroom';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-classroom-form',
  imports: [ReactiveFormsModule],
  templateUrl: './classroom-form.html',
})
export class ClassroomForm {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly alertService = inject(AlertService);
  private readonly classroomService = inject(ClassroomService);

  id: number | null = null;
  get isEditing(): boolean {
    return this.id !== null;
  }

  classroomForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(20)]],
    building: ['', [Validators.required, Validators.maxLength(100)]],
    capacity: [1, [Validators.required, Validators.min(1), Validators.max(500), Validators.pattern(/^\d+$/)]],
    type: ['', [Validators.required, Validators.maxLength(30)]],
    status: [true],
  });

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId === null) return;

    const id = Number(paramId);
    if (!Number.isSafeInteger(id) || id < 1) {
      this.alertService.toast('Identificador de salón no válido', 'error');
      this.goToList();
      return;
    }

    this.id = id;
    this.classroomService.getById(id).subscribe({
      next: (classroom) => this.setValues(classroom),
      error: () => {
        this.alertService.toast('Error al consultar el salón', 'error');
        this.goToList();
      },
    });
  }

  saveClassroom(): void {
    if (this.classroomForm.invalid) {
      this.classroomForm.markAllAsTouched();
      return;
    }

    const classroom: CreateClassroomRequest = {
      ...this.classroomForm.getRawValue(),
      code: this.classroomForm.controls.code.value.trim(),
      building: this.classroomForm.controls.building.value.trim(),
      type: this.classroomForm.controls.type.value.trim(),
    };

    const request = this.id === null
      ? this.classroomService.create(classroom)
      : this.classroomService.update(this.id, classroom);

    request.subscribe({
      next: () => {
        this.alertService.toast(
          this.isEditing ? 'Salón actualizado correctamente' : 'Salón registrado correctamente',
          'success',
        );
        this.goToList();
      },
      error: () => this.alertService.toast('Error al guardar el salón', 'error'),
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/classrooms');
  }

  private setValues(classroom: Classroom): void {
    this.classroomForm.patchValue({
      code: classroom.code,
      building: classroom.building,
      capacity: classroom.capacity,
      type: classroom.type,
      status: classroom.status,
    });
  }
}
