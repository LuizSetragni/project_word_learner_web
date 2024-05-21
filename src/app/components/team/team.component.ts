import { NgFor, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgStyle, NgFor],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'João Silva',
      role: 'CEO',
      bio: 'João é o fundador e CEO da empresa, com mais de 20 anos de experiência no setor.',
      photo: 'assets/images/nico.png'
    },
    {
      name: 'Maria Souza',
      role: 'CTO',
      bio: 'Maria é a CTO e lidera a equipe de desenvolvimento com foco em inovação e tecnologia.',
      photo: 'assets/images/teste1.png'
    },
    {
      name: 'Pedro Santos',
      role: 'Designer',
      bio: 'Pedro é responsável pela identidade visual da empresa e experiência do usuário.',
      photo: 'assets/images/teste2.png'
    }
  ];

  constructor() { }

  ngOnInit(): void { }

}
