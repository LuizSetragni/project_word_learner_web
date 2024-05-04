import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showNavBar: boolean = true;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.showNavBar = this.router.url === '/login' ? false : true;
    });
  }
}
