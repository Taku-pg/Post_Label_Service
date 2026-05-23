import { Component, computed, inject, viewChild } from '@angular/core';
import { Progress } from "../../view-components/progress/progress";
import { ItemTable } from "../../view-components/item-table/item-table";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddItemForm } from '../../view-components/add-item-form/add-item-form';
import { Item } from '../../models/item.model';
import { Router } from '@angular/router';
import { DeliveryService } from '../../services/delivery.service';
import { ConfirmDialog } from '../../view-components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-content-information',
  imports: [Progress, ItemTable],
  templateUrl: './content-information.html',
  styleUrl: './content-information.css',
})
export class ContentInformation {
  private _matDialog = inject(MatDialog); 
  private _router = inject(Router);
  private _deliveryService = inject(DeliveryService);
  deliveryInfo = this._deliveryService.deliveryInfo;


  onRemoveItem(item: Item){
    this._deliveryService.removeItem(item);
  }

  onClickAddItem(){
    const dialogConfig = new MatDialogConfig;
    dialogConfig.height = '70%';
    dialogConfig.width = '80%';

    const modalDialog = this._matDialog.open(AddItemForm, dialogConfig);
  }

  onClickBack(){
    this._router.navigate(['delivery-info']);
  }

  onClickNext(){
    const contents = this._deliveryService.deliveryInfo().contents;
    if(contents.length === 0){
      this.callDialog();
      return;
    }
    this._router.navigate(['confirmation']);
  }

  callDialog(){
    const dialogConfig = new MatDialogConfig;
        dialogConfig.height = '35%';
        dialogConfig.width = '40%';
        dialogConfig.data = {
          title: 'No Item',
          message: 'Please input at least 1 item',
          type: 'ok'
        }
    
        const modalDialog = this._matDialog.open(ConfirmDialog, dialogConfig)
  }
}
