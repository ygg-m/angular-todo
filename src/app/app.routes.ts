import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TodoComponent } from './pages/todo/todo.component';
import { DefaultComponent } from './shared/layouts/default/default.component';
import { MasterComponent } from './shared/layouts/master/master.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    // canActivate: [guestGuard],
    children: [
      {
        path: '' || 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: '',
    component: MasterComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: 'todo',
        component: TodoComponent,
      },
    ],
  },
];
