import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  successMessage: string | null = null;

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['message'] === 'success') {
        this.successMessage = 'Registro bem-sucedido! Por favor, faça login.';
      }
    });
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
        localStorage.setItem('token', response.access);
        this.router.navigate(['/progress']);
      },
      error => {
        console.log('Erro de login', error);
      }
    );
  }
}
