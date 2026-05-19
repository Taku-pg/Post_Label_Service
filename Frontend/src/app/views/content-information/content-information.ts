import { Component, inject } from '@angular/core';
import { Progress } from "../../view-components/progress/progress";
import { ItemTable } from "../../view-components/item-table/item-table";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddItemForm } from '../../view-components/add-item-form/add-item-form';

@Component({
  selector: 'app-content-information',
  imports: [Progress, ItemTable, AddItemForm],
  templateUrl: './content-information.html',
  styleUrl: './content-information.css',
})
export class ContentInformation {

  _matDialog = inject(MatDialog); 

  onClickAddItem(){
    const dialogConfig = new MatDialogConfig;
    dialogConfig.height = '70%';
    dialogConfig.width = '80%';

    const modalDialog = this._matDialog.open(AddItemForm, dialogConfig);
  }
}
