import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Progress } from "../../view-components/progress/progress";
import { DeliveryInfoForm } from "../../view-components/delivery-info-form/delivery-info-form";
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialog } from '../../view-components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-delivery-information',
  imports: [Progress, DeliveryInfoForm],
  templateUrl: './delivery-information.html',
  styleUrl: './delivery-information.css',
})
export class DeliveryInformation {
  private _router = inject(Router);
  private _matDialog = inject(MatDialog);
  formElement = viewChild<DeliveryInfoForm>('formElement');


  onClickNext(){
    this.formElement()?.validate();
    this._router.navigate(['contents']);
  }

  onClickBack(){
    const dialogConfig = new MatDialogConfig;
    dialogConfig.height = '35%';
    dialogConfig.width = '40%';
    dialogConfig.data = {
      title: 'Caution',
      message: 'Input information will be discarded.\nAre you OK ?'
    }

    const modalDialog = this._matDialog.open(ConfirmDialog, dialogConfig)
  }
}
