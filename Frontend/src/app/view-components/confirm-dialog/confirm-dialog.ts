import { Component, inject, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  private _dialog = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  isOnlyOkDialog = this.data.type === 'ok' ? true:false;

  onClickConfirm(){
    const res =  true;
    this._dialog.close(res);
  }

  onClickCancel(){
    this._dialog.close();
  }

  onClickOK(){
    this._dialog.close();
  }

}
