import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { LoginWordLearnerComponent } from './components/login-word-learner/login-word-learner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TeamComponent } from './components/team/team.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent}, // so ir pra home se tiver logado
    {path: 'about', component: AboutComponent}, // poder acessar o about ao entrar no word-learner
    {path: 'user-register', component: UserRegisterComponent},
    {path: 'new-user', component: NewUserComponent},
    {path: 'login-word-learner', component: LoginWordLearnerComponent},
    {path: '', redirectTo: '/about', pathMatch: 'full'},
    { path: 'team', component: TeamComponent },
    {path: '**', component: PageNotFoundComponent}
];
