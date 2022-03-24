import { NgModule } from '@angular/core';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToAdmin = () => redirectLoggedInTo(['admin']);

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
    ...canActivate(redirectLoggedInToAdmin),
  },

  { path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },

  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
