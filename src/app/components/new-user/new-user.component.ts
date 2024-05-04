import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {


  email: any;
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  public emailExist(email:string){
    if(false)//buscar api no banco, se existir, passar email como paramentro, input já preenchido falndo colocar senha 
    this.router.navigate(['/login-word-learner'])
    else{//vai fazer registro completo com email já preenchido passando por parametro
      
      this.router.navigate(['/user-register'])
    }

  }
}
