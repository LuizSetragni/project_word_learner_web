import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { NewUserComponent } from './components/new-user/new-user.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'user-register', component: UserRegisterComponent},
    {path: 'login', component: NewUserComponent}
];
