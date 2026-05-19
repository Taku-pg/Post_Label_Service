import { Component, inject, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  private _dialog = inject(MatDialogRef);
  private router = inject(Router);
  data = inject(MAT_DIALOG_DATA);
  
  title = input<string>('');
  message = input<string>('');

  onClickConfirm(){
    this.closeDialog();
    this.router.navigate(['delivery-type']);
  }

  onClickCancel(){
    this.closeDialog();
  }

  closeDialog(){
    this._dialog.close();
  }

}
