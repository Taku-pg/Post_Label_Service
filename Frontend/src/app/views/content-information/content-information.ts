import { Component, inject } from '@angular/core';
import { Progress } from "../../view-components/progress/progress";
import { ItemTable } from "../../view-components/item-table/item-table";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddItemForm } from '../../view-components/add-item-form/add-item-form';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-content-information',
  imports: [Progress, ItemTable],
  templateUrl: './content-information.html',
  styleUrl: './content-information.css',
})
export class ContentInformation {
  private _matDialog = inject(MatDialog); 

  receiveNewItem(item: Item){
    console.log('received');
    console.log(item);
  }

  onClickAddItem(){
    const dialogConfig = new MatDialogConfig;
    dialogConfig.height = '70%';
    dialogConfig.width = '80%';

    const modalDialog = this._matDialog.open(AddItemForm, dialogConfig);
  }
}
