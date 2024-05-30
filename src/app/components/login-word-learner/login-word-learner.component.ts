import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtUtils } from '../../utils/jwtUtils';

@Component({
  selector: 'app-login-word-learner',
  templateUrl: './login-word-learner.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  styleUrls: ['./login-word-learner.component.css']
})
export class LoginWordLearnerComponent implements OnInit {
getErrorMessage(arg0: string) {
  console.log("error")
}

  passwordVisible: boolean = false;
  loginForm!: FormGroup;

  constructor(private loginService: LoginService, private router: Router, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.loginService.login(credentials).subscribe(
      response => {
        console.log('Login Bem-Sucedido', response.access);
        localStorage.setItem('token', response.access);
        this.router.navigate(['/home']);
      },
      error => {
        console.log('Erro de login', error);
      }
    );
  }
}
