import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showNavBar: boolean = true;
  constructor(private router: Router) {}

  displayNavbar(): boolean {
    const routesNoDisplayNavBAr = ['/new-user', '/user-register']
    return !routesNoDisplayNavBAr.includes(this.router.url); 
  }
}
