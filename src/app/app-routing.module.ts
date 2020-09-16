import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';
import { UserComponent } from './theme/layout/user/user.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { AdminAuthGuard } from './shared/guards/admin-auth.guard';
import { AdminLoggedInGuard } from './shared/guards/admin-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(module => module.HomeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'blog',
        loadChildren: () => import('./pages/blog/blog.module').then(module => module.BlogModule),
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/admin/dashboard/dashboard.module').then(module => module.DashboardModule),
        canActivate: [AdminAuthGuard]
      },
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'signup',
        loadChildren: () => import('./pages/authentication/auth-signup/auth-signup.module').then(module => module.AuthSignupModule)
      },
      {
        path: 'signin',
        loadChildren: () => import('./pages/authentication/auth-signin/auth-signin.module').then(module => module.AuthSigninModule),
        canActivate: [LoggedInGuard]
      },
      {
        path: 'admin/signin',
        loadChildren: () => import('./pages/admin/auth-signin/auth-signin.module').then(module => module.AuthSigninModule),
        canActivate: [AdminLoggedInGuard]
      },
      {
        path: 'coming-soon',
        loadChildren: () => import('./pages/maintenance/mainten-coming-soon/mainten-coming-soon.module').then(module => module.MaintenComingSoonModule)
      },
      {
        path: 'error',
        loadChildren: () => import('./pages/maintenance/mainten-error/mainten-error.module').then(module => module.MaintenErrorModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
