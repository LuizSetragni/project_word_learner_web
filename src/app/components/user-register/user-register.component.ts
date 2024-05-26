import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  registerForm: FormGroup;


  constructor(private userService: UserService, private formBuilder: FormBuilder) {
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
      }, error => {
        console.log("Erro: ", error);
      })
    }
  }
}




