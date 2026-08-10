import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { CustomerFormComponent } from './pages/customer-form/customer-form.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { roleGuard } from './guards/role.guard';
import { TaskComponent } from './pages/task/task.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AccessDeinedComponent } from './pages/access-deined/access-deined.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [
      authGuard,
      roleGuard
    ],
    data: {
      roles: ['HR']
    }
  },
  {
    path: 'users/add',
    component: UserFormComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['HR']
    }
  },
  {
    path: 'users/edit/:id',
    component: UserFormComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['HR']
    }
  },
  {
    path: 'customers',
    component: CustomerComponent,
        canActivate: [
      authGuard,
      roleGuard
    ],
    data: {
      roles: [
        'HR',
        'Manager',
        'Employee'
      ]
    }
  },
  {
    path: 'tasks',
    component: TaskComponent,
    canActivate: [
      authGuard,
      roleGuard
    ],
    data: {
      roles: [
        'HR',
        'Manager',
        'Employee'
      ]
    }
  },

  {
    path: 'customers/add',
    component: CustomerFormComponent,
  },

  {
    path: 'customers/edit/:id',
    component: CustomerFormComponent
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.component')
      .then(c => c.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/reset-password/reset-password.component')
        .then(c => c.ResetPasswordComponent)
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
    {
    path:'ask-emi',
    loadComponent: () => import('./ask-emi/ask-emi.component')
      .then(c => c.AskEmiComponent)
  },
  {
    path: '403',
    component: AccessDeinedComponent
  },
  {

    path: '**',

    component: NotFoundComponent

  },


];
