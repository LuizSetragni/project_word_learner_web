import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { LoginWordLearnerComponent } from './components/login-word-learner/login-word-learner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TeamComponent } from './components/team/team.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'about', component: AboutComponent},
    {path: 'user-register', component: UserRegisterComponent},
    {path: 'new-user', component: NewUserComponent},
    {path: 'login-word-learner', component: LoginWordLearnerComponent},
    {path: '', redirectTo: '/about', pathMatch: 'full'},
    {path: 'team', component: TeamComponent },
    {path: '**', component: PageNotFoundComponent}
];
