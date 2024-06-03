import { Component, OnInit } from '@angular/core';
import { JwtUtils } from '../../utils/jwtUtils';
import { WordService } from '../../services/word/word.service';

import { WeekCountInterface } from '../../interfaces/weekCount.interface';
import { WordListInterface } from '../../interfaces/wordList.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LinkInterface } from '../../interfaces/link.interface';

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
  wordList: WordListInterface[] = [];
  linkList: LinkInterface[] = [];
  filteredWordList: WordListInterface[] = [];
  filteredLinkList: LinkInterface[] = [];


  searchTermWord: string = '';
  searchTermLink: string = '';
  private token: any = localStorage.getItem('token');

  ngOnInit(): void {
    if (this.token) JwtUtils.decodeJwt(this.token);
    this.getNumberWeek();
    this.getWordList();
    this.getLinkList();
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

  private getLinkList() {
    if (JwtUtils.globalUserId) {
      this.wordService.getLinkList(JwtUtils.globalUserId).subscribe(
        (data: LinkInterface[]) => {
          this.linkList = data;
          this.filteredLinkList = this.linkList.slice(0, 10);
        }, error => {
          console.log('Erro ao obter lista de palavras', error)
        }
      )
    }
  }

  filterWordList() {
    this.filteredWordList = this.wordList.filter(word => {
      return word.content.toLowerCase().includes(this.searchTermWord.toLowerCase());
    });
  }

  filterLinkList() {
    this.filteredLinkList = this.linkList.filter(content => {
      return content.link.toLowerCase().includes(this.searchTermLink.toLowerCase());
    });
  }
}
