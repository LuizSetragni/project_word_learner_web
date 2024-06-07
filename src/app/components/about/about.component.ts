import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtUtils } from '../../utils/jwtUtils';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  isLogado: boolean = false;
  private token: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
      if (this.token) JwtUtils.decodeJwt(this.token);
      this.isLogado = JwtUtils.isLogado;
    } else {
      console.warn('localStorage is not available');
    }
  }

  openRouter(route: string): void {
    this.router.navigate([`${route}`]);
  }
}
