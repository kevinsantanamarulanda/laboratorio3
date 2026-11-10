import { Routes } from '@angular/router';
import { ListStudents } from './modules/students/pages/list-students/list-students';
import { CreateStudent } from './modules/students/pages/create-student/create-student';
import { DetailStudent } from './modules/students/pages/detail-student/detail-student';
import { UpdateStudent } from './modules/students/pages/update-student/update-student';
import { ListTeachers } from './modules/teachers/pages/list-teachers/list-teachers';
import { TeacherForm } from './modules/teachers/pages/teacher-form/teacher-form';
import { DetailTeacher } from './modules/teachers/pages/detail-teacher/detail-teacher';
import { ListClassrooms } from './modules/classrooms/pages/list-classrooms/list-classrooms';
import { ClassroomForm } from './modules/classrooms/pages/classroom-form/classroom-form';
import { DetailClassroom } from './modules/classrooms/pages/detail-classroom/detail-classroom';

export const routes: Routes = [
    { path: '', redirectTo: 'students', pathMatch: 'full' },
    { 
        path: 'students', 
        children: [
            { path: 'list', component: ListStudents },
            { path: 'create', component: CreateStudent },
            { path: 'update/:id', component: UpdateStudent },
            { path: 'detail/:id', component: DetailStudent },
            { path: '**', redirectTo: 'list' }
        ] 
    },
    {
        path: 'teachers',
        children: [
            { path: 'list', component: ListTeachers },
            { path: 'create', component: TeacherForm },
            { path: 'edit/:id', component: TeacherForm },
            { path: 'detail/:id', component: DetailTeacher },
            { path: '**', redirectTo: 'list' },
        ],
    },
    {
        path: 'classrooms',
        children: [
            { path: 'list', component: ListClassrooms },
            { path: 'create', component: ClassroomForm },
            { path: 'edit/:id', component: ClassroomForm },
            { path: 'detail/:id', component: DetailClassroom },
            { path: '**', redirectTo: 'list' },
        ],
    }
];
