import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserpageComponent } from './userpage/userpage.component';
import { AdminPassComponent } from './admin-pass/admin-pass.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home/:signup/:username', component: HomeComponent},
  {path: 'movie/:name/:username', component: UserpageComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'adminPass', component: AdminPassComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
