import { Component, OnInit } from '@angular/core';
import { JwtUtils } from '../../utils/jwtUtils';
import { WordService } from '../../services/word/word.service';

import { WeekCountInterface } from '../../interfaces/weekCount.interface';
import { WordListInterface } from '../../interfaces/wordList.interface';
import { wordInterface } from '../../interfaces/word.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class HomeComponent implements OnInit {
  constructor(private wordService: WordService) { }
  wordCounts: WeekCountInterface | undefined;
  wordList: WordListInterface [] = [] ;
  filteredWordList: WordListInterface[] = [];

  searchTerm: string = '';
  private token: any = localStorage.getItem('token');

  ngOnInit(): void {
    this.wordList = [{ id: 0, content: ''}];
    if (this.token) JwtUtils.decodeJwt(this.token);
    this.getNumberWeek();
    this.getWordList();
  }

  private getNumberWeek() {
    if (JwtUtils.globalUserId) {
      this.wordService.getWordCountLastWeek(JwtUtils.globalUserId).subscribe(
        data => {
          this.wordCounts = data;
        }, error => {
          console.log('Erro ao obter contagem das palavras', error)
        })
    }
  }

  private getWordList() {
    if (JwtUtils.globalUserId) {
      this.wordService.getWordList(JwtUtils.globalUserId).subscribe(
        (data: WordListInterface[]) => {
          this.wordList = data;
          this.filteredWordList = this.wordList.slice(0, 10);
        }, error => {
          console.log('Erro ao obter lista de palavras', error)
        }
      )
      
    }
  }

  filterWordList() {
    this.filteredWordList = this.wordList.filter(word => {
      return word.content.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
}
