import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WordInterface } from '../../interfaces/word.interface';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
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
    user_id: 0
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComponent>,
  ) {

  }

  ngOnInit(): void {
    this.word = this.data.word;
  }

  close(): void {
    this.dialogRef.close();
  }
}



