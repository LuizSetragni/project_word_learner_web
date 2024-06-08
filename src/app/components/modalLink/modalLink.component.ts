import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WordService } from '../../services/word/word.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { WordInterface } from '../../interfaces/word.interface';


@Component({
  selector: 'app-modalLink',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modalLink.component.html',
  styleUrl: './modalLink.component.css'
})
export class ModalLinkComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalLinkComponent>,
    public dialog: MatDialog,
    private wordService: WordService,
  ) {

  }

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
    annotation: ''
  };

  ngOnInit(): void {
console.log(this.data.wordList)
  }

  openModal(wordId: number) {
    this.getWordContent(wordId).then(() => {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '1000px',
        data: this.wordContent,
      });

      dialogRef.afterClosed().subscribe(() => {
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


  close(): void {
    this.dialogRef.close();
  }
}