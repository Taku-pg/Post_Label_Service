import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Progress } from "../../view-components/progress/progress";
import { DeliveryInfoForm } from "../../view-components/delivery-info-form/delivery-info-form";
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialog } from '../../view-components/confirm-dialog/confirm-dialog';
import { DeliveryInfo } from '../../models/deliveryInfo.model';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-delivery-information',
  imports: [Progress, DeliveryInfoForm],
  templateUrl: './delivery-information.html',
  styleUrl: './delivery-information.css',
})
export class DeliveryInformation {
  private _router = inject(Router);
  private _matDialog = inject(MatDialog);
  private _deliveryService = inject(DeliveryService);
  formElement = viewChild<DeliveryInfoForm>('formElement');


  onClickNext(){
    const isValid = this.formElement()?.validate();

    if(isValid){
      const formData = this.formElement()?.formValue()!;
      const deliveryInfo: DeliveryInfo = {
        sender: {
          firstName: formData.firstName!,
          lastName: formData.lastName!,
          email: formData.email!,
          phone: formData.phone!,
          company: formData.company?? null
        },
        senderAddress: {
          street: formData.senderStreet!,
          city: formData.senderCity!,
          zip: formData.senderZip!,
          country: formData.senderCountry?? null,
        },
        receiverAddress: {
          street: formData.receiverStreet!,
          city: formData.receiverCity!,
          zip: formData.receiverZip!,
          country: formData.receiverCountry?? null,
        },
        deliveryOption: formData.deliveryOption!,
        deliveryPurpose: formData.deliveryPurpose?? null
      }
      this._deliveryService.setDeliveryInfo(deliveryInfo);
      this._router.navigate(['contents']);
    }
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
