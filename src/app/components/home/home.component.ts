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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class HomeComponent implements OnInit {
totalMounth: any = 1323;
mounth: any = 'Junho de 2024';

  constructor(private wordService: WordService, public dialog: MatDialog) { }
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
    user_id: 0
  };
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
          this.filteredWordList = this.wordList;
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
          this.filteredLinkList = this.linkList;
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

  openModal(wordId: number) {
    this.getWordContent(wordId).then(() => {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '1000px',
        data: this.wordContent,
      });

      dialogRef.afterClosed().subscribe(result => {
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
    const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = wordCounts;
    return Monday + Tuesday + Wednesday + Thursday + Friday + Saturday + Sunday;
  }

  openModalLink(link: string) {
    // this.getWordContent(link).then(() => {
      // const dialogRef = this.dialog.open(ModalComponent, {
      //   width: '1000px',
      //   data: this.wordContent,
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('O modal foi fechado');
      // });
    // })
  }

  // private getWordContent(wordId: number): Promise<WordInterface> {
  //   return new Promise((resolve, rejects) => {
  //     this.wordService.getWordContent(wordId).subscribe(
  //       (data: WordInterface) => {
  //         this.wordContent = data;
  //         resolve(data);

  //       }, error => {
  //         console.log('Erro ao obter contagem das palavras', error)
  //         rejects(error);
  //       }
  //     );
  //   });
  // }
}
