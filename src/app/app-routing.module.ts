import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import {LoginComponent} from './login/login.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: "full" },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'navbar', component:NavbarComponent}
];

@NgModule({
 // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
