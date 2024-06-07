import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  ) {

  }

  ngOnInit(): void {

  }

  openModal(wordId: number) {
    console.log(wordId)
    }


  close(): void {
    this.dialogRef.close();
  }
}