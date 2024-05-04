import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { LoginWordLearnerComponent } from './components/login-word-learner/login-word-learner.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'user-register', component: UserRegisterComponent},
    {path: 'new-user', component: NewUserComponent},
    {path: 'login-word-learner', component: LoginWordLearnerComponent}
];
