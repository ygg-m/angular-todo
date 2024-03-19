import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RecoveryComponent } from './pages/auth/recovery/recovery.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TodosComponent } from './pages/todos/todos.component';

export const routes: Routes = [
  {
    path: '',
    // component: AuthComponent,
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    title: 'ToDo',
    component: TodosComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'register',
        title: 'ToDo - Register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        title: 'ToDo - Login',
        component: LoginComponent,
      },
      {
        path: 'recovery',
        title: 'ToDo - Recover Password',
        component: RecoveryComponent,
      },
    ],
  },
  { path: 'login', redirectTo: '/auth/login' },
  { path: 'register', redirectTo: '/auth/register' },
  { path: 'recovery', redirectTo: '/auth/recovery' },
  { path: '**', component: PageNotFoundComponent },
];
