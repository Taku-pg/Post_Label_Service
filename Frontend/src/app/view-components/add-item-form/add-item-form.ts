import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-form',
  imports: [],
  templateUrl: './add-item-form.html',
  styleUrl: './add-item-form.css',
})
export class AddItemForm {
  _dialog = inject(MatDialogRef);

  
  onClickCancel(){
    //alert('The input information is discrded');
    this.closeDialog();
  }

  closeDialog(){
    this._dialog.close();
  }
}
