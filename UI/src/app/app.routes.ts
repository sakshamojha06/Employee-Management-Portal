import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { EmployeeList } from './components/employee-list/employee-list';
import { AddEmployee } from './components/add-employee/add-employee';
import { EditEmployee } from './components/edit-employee/edit-employee';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  {
    path: 'employees',
    component: EmployeeList,
    canActivate: [authGuard]
  },
  {
    path: 'add-employee',
    component: AddEmployee,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'edit-employee/:id',
    component: EditEmployee,
    canActivate: [authGuard, adminGuard]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];