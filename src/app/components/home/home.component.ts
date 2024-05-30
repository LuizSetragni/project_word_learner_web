import { Component, OnInit } from '@angular/core';
import { JwtUtils } from '../../utils/jwtUtils';
import { WordService } from '../../services/word/word.service';

import { WeekCountInterface } from '../../interfaces/weekCount.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private wordService: WordService) { }
  wordCounts: WeekCountInterface | undefined;
  private token: any = localStorage.getItem('token');
  
  ngOnInit(): void {
    if(this.token) JwtUtils.decodeJwt(this.token);
    this.getNumberWeek();
  }
  
  private getNumberWeek(){
    if (JwtUtils.globalUserId){
      this.wordService.getWordCountLastWeek(JwtUtils.globalUserId).subscribe(
        data => {
          this.wordCounts = data;
          console.log(this.wordCounts);
        }, error => {
          console.log('Erro ao obter contagem das palavras', error)
        })
      }
    }
}
