import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { response } from 'express';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  registerForm: FormGroup;


  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      profession: ['', Validators.required],
      date_of_birth: ['', Validators.required],
    })
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe(response => {
        console.log("Usuario criado com sucesso:", response);
        this.router.navigate(['/login-word-learner'], { queryParams: { message: 'success' } });
      }, error => {
        console.log("Erro: ", error);
      })
    }
  }
}




