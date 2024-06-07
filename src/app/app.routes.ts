import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { LoginWordLearnerComponent } from './components/login-word-learner/login-word-learner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TeamComponent } from './components/team/team.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

    {path: 'progress', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'home', component: AboutComponent},
    {path: 'register', component: UserRegisterComponent},
    {path: 'login', component: LoginWordLearnerComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'team', component: TeamComponent },
    {path: '**', component: PageNotFoundComponent}
];
