import { Component, OnInit } from '@angular/core';
import { JwtUtils } from '../../utils/jwtUtils';
import { WordService } from '../../services/word/word.service';

import { WeekCountInterface } from '../../interfaces/weekCount.interface';
import { WordListInterface } from '../../interfaces/wordList.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LinkInterface } from '../../interfaces/link.interface';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { WordInterface } from '../../interfaces/word.interface';
import { TotalWordInterface } from '../../interfaces/totalWord.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class HomeComponent implements OnInit {
  month: any = 'Junho de 2024';
  nameMonth: string[] = [];
  totalMonth: number[] = [];
  totalCountMonth: number = 0;
  totalWordPerUser: TotalWordInterface | undefined;


  constructor(
    private wordService: WordService,
    public dialog: MatDialog) { }

  wordCounts: WeekCountInterface | undefined;
  wordContent: WordInterface = {
    id: 0,
    content: '',
    link: '',
    phrase_1: '',
    phrase_2: '',
    phrase_3: '',
    synonym_1: '',
    synonym_2: '',
    synonym_3: '',
    meaning_1: '',
    meaning_2: '',
    meaning_3: '',
    created_at: new Date(),
    user_id: 0,
    read: false,
  };
  wordList: WordListInterface[] = [];
  linkList: LinkInterface[] = [];
  filteredWordListRead: WordListInterface[] = [];
  filteredWordListNotRead: WordListInterface[] = [];
  filteredLinkList: LinkInterface[] = [];
  searchTermWord: string = '';
  searchTermLink: string = '';


  private token: any = localStorage.getItem('token');

  ngOnInit(): void {
    if (this.token) JwtUtils.decodeJwt(this.token);
    this.updatePage();
  }

  private updatePage() {
    this.getNumberWeek();
    this.getWordList();
    this.getLinkList();
    this.getTreeMonth();
    this.getWordTotalPerUser();
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
          this.listFill(this.wordList);
        }, error => {
          console.log('Erro ao obter lista de palavras', error)
        }
      )
    }
  }

  private listFill(wordList: WordListInterface[]) {
    this.filteredWordListNotRead = wordList.filter(word => !word.read);
    this.filteredWordListRead = wordList.filter(word => word.read);
  }

  private getLinkList() {
    if (JwtUtils.globalUserId) {
      this.wordService.getLinkList(JwtUtils.globalUserId).subscribe(
        (data: LinkInterface[]) => {
          this.linkList = data;
          this.filteredLinkList = this.linkList;
        }, error => {
          console.log('Erro ao obter lista de palavras', error)
        }
      )
    }
  }

  filterWordList() {
    this.filteredWordListRead = this.wordList.filter(word => {
      return word.read && word.content.toLowerCase().includes(this.searchTermWord.toLowerCase());
    });

    this.filteredWordListNotRead = this.wordList.filter(word => {
      return !word.read && word.content.toLowerCase().includes(this.searchTermWord.toLowerCase());
    });
  }


  filterLinkList() {
    this.filteredLinkList = this.linkList.filter(content => {
      return content.link.toLowerCase().includes(this.searchTermLink.toLowerCase());
    });
  }

  openModal(wordId: number) {
    this.getWordContent(wordId).then(() => {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '1000px',
        data: this.wordContent,
      });

      dialogRef.afterClosed().subscribe(result => {
        this.updatePage();
        console.log('O modal foi fechado');
      });
    })
  }

  private getWordContent(wordId: number): Promise<WordInterface> {
    return new Promise((resolve, rejects) => {
      this.wordService.getWordContent(wordId).subscribe(
        (data: WordInterface) => {
          this.wordContent = data;
          resolve(data);

        }, error => {
          console.log('Erro ao obter contagem das palavras', error)
          rejects(error);
        }
      );
    });
  }

  wordTotalWeek(wordCounts: WeekCountInterface | undefined): number {
    if (!wordCounts) { return 0 }
    return 0;
  }

  formatLink(link: string): string {
    let formattedLink = link.replace(/^https?:\/\/(www\.)?/, '');
    if (formattedLink.endsWith('/')) {
      formattedLink = formattedLink.slice(0, -1);
    }
    return formattedLink;
  }

  private async getWordMonth(month: number) {
    return new Promise<void>((resolve, reject) => {
      if (JwtUtils.globalUserId) {
        this.wordService.getTotalWordMonth(JwtUtils.globalUserId, month).subscribe(
          (data: number) => {
            this.totalCountMonth = data;
            resolve()
          }, error => {
            console.log('Erro ao obter total de words', error);
            reject(error)
          }
        );
      }
    })
  }

  private getWordTotalPerUser() {
    if (JwtUtils.globalUserId) {
      this.wordService.getTotalWordPerUser().subscribe(
        (data: TotalWordInterface) => {
          this.totalWordPerUser = data;
          console.log(data)
        }, error => {
          console.log('Erro ao obter total de words', error);
        }
      );
    }
  }

  async getTreeMonth() {
    const currentDate = new Date();
    for (let i = 0; i < 4; i++) {
      let monthActual = (currentDate.getMonth() - i + 1);

      if (monthActual < 1) {
        monthActual += 12;
      }

      await this.getWordMonth(monthActual);

      this.nameMonth[i] = this.getNameMonth(monthActual);
      this.totalMonth[i] = this.totalCountMonth;
    }
  }

  getNameMonth(month: number): string {
    switch (month) {
      case 1: return 'Janeiro';
      case 2: return 'Fevereiro';
      case 3: return 'Março';
      case 4: return 'Abril';
      case 5: return 'Maio';
      case 6: return 'Junho';
      case 7: return 'Julho';
      case 8: return 'Agosto';
      case 9: return 'Setembro';
      case 10: return 'Outubro';
      case 11: return 'Novembro';
      case 12: return 'Dezembro';
      default: return 'Mês';
    }
  }
}