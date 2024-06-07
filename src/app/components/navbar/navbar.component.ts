import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JwtUtils } from '../../utils/jwtUtils';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showNavBar: boolean = true;
  isLogado: boolean = false;
  userName: string | null = '';
  private token: any;
  message: string | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
      if (this.token) JwtUtils.decodeJwt(this.token);
      this.isLogado = JwtUtils.isLogado;
      this.userName = JwtUtils.globalName;
    } else {
      console.warn('localStorage is not available');
    }
  }

  displayNavbar(): boolean {
    const routesNoDisplayNavBAr = ['/new-user', '/user-register'];
    return !routesNoDisplayNavBAr.includes(this.router.url);
  }

  openRouter(route: string): void {
    this.router.navigate([`${route}`]);
  }
}
