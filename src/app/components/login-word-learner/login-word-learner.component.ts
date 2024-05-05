import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-word-learner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-word-learner.component.html',
  styleUrl: './login-word-learner.component.css'
})
export class LoginWordLearnerComponent {
email: any;

}
