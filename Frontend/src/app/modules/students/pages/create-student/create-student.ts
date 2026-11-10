import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateStudentRequest } from '../../interfaces/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-create-student',
  imports: [
    Back, 
    ReactiveFormsModule
  ],
  templateUrl: './create-student.html',
})
export class CreateStudent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private studentService = inject(StudentService);

  semesters = Array.from({ length: 10 }, (_, i) => i + 1);
  maxBirthdate = new Date().toISOString().slice(0, 10);

  studentForm = this.fb.group({
    id: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
    address: ['', [Validators.required, Validators.maxLength(150)]],
    birthdate: ['', Validators.required],
    semester: ['', [Validators.required, Validators.min(1), Validators.max(10), Validators.pattern(/^\d+$/)]],
    status: [true]
  });

  createStudent(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }
    const student: CreateStudentRequest = {
      id: Number(this.studentForm.value.id),
      name: this.studentForm.value.name!,
      email: this.studentForm.value.email!,
      phone: this.studentForm.value.phone!,
      address: this.studentForm.value.address!,
      birthdate: new Date(this.studentForm.value.birthdate!),
      semester: Number(this.studentForm.value.semester),
      status: this.studentForm.value.status!
    };
    console.log('Estudiante para enviar al backend:', student);
    this.studentService.create(student).subscribe({
      next: () => {
        this.alertService.toast(
          'Estudiante registrado correctamente',
          'success'
        );
        this.router.navigateByUrl('/students');
      },
      error: (error: HttpErrorResponse) => {
        const message = error.error?.error ?? 'Error al crear el estudiante';
        this.alertService.toast(message, 'error');
      }
    })

  }
  
}
