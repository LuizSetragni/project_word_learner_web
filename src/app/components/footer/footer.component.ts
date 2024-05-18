import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  showFooter: boolean = true;
  constructor(private router: Router) {}

  displayFooter(): boolean {
    const routesNoDisplayFooter = ['/new-user', '/user-register']
    return !routesNoDisplayFooter.includes(this.router.url); 
  }
}
