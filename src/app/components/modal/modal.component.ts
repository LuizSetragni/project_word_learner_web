import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WordInterface } from '../../interfaces/word.interface';
import { FormsModule } from '@angular/forms';
import { WordService } from '../../services/word/word.service';
import { error } from 'console';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  word: WordInterface = {
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComponent>,
    private wordService : WordService
  ) {

  }

  ngOnInit(): void {
    this.word = this.data.word;
  }

  close(): void {
    this.saveAnnotation(this.word.annotation, this.word.id)
    this.dialogRef.close();
  }

  saveAnnotation(annotation:string, wordId:number){
    this.wordService.updateWordAnnotation(wordId, annotation).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log('erro ao salvar anotação!', error)
      }   
    )
  }
}