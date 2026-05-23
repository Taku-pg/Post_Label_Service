import { Component, inject, viewChild } from '@angular/core';
import { Progress } from "../../view-components/progress/progress";
import { DeliveryInfoForm } from "../../view-components/delivery-info-form/delivery-info-form";
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialog } from '../../view-components/confirm-dialog/confirm-dialog';
import { DeliveryInfo } from '../../models/deliveryInfo.model';
import { DeliveryService } from '../../services/delivery.service';
import { firstValueFrom, Observable } from 'rxjs';

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
  deliveryInfo = this._deliveryService.deliveryInfo;
  formElement = viewChild<DeliveryInfoForm>('formElement');


  async onClickNext() {
    const isValid = this.formElement()?.validate();

    if (isValid) {
      const formData = this.formElement()?.formValue()!;
      const deliveryPurpose = formData.deliveryPurpose;

      if(deliveryPurpose === "sales"){
        const confirm = await this.callDialog(
          'Caution',
          'This delivery will be imposed addtional tax.\nDo you agree?',
          'confirm'
        );

        console.log(confirm);

        if(!confirm!){
          return;
        }
        
      }

      const deliveryInfo: DeliveryInfo = this.setValue(formData);

      this._deliveryService.setDeliveryInfo(deliveryInfo);
      this._router.navigate(['contents']);
    }
  }

  async onClickBack() {
    const res = await this.callDialog(
      'Caution',
      'Input information will be discarded.\nAre you sure ?',
      'confirm');

      if (res!) {
        this._router.navigate(['delivery-type']);
      }
  }


  setValue(formData: any): DeliveryInfo {
    const deliveryInfo: DeliveryInfo = {
      sender: {
        firstName: formData.firstName!,
        lastName: formData.lastName!,
        email: formData.email!,
        phone: formData.phone!,
        company: formData.company ?? null
      },
      senderAddress: {
        street: formData.senderStreet!,
        city: formData.senderCity!,
        zip: formData.senderZip!,
        country: formData.senderCountry ?? null,
      },
      receiverAddress: {
        street: formData.receiverStreet!,
        city: formData.receiverCity!,
        zip: formData.receiverZip!,
        country: formData.receiverCountry ?? null,
      },
      deliveryOption: formData.deliveryOption!,
      deliveryPurpose: formData.deliveryPurpose ?? null
    }
    return deliveryInfo;
  }

  async callDialog(title: String, message: string, type: string){
    const dialogConfig = new MatDialogConfig;
    dialogConfig.height = '35%';
    dialogConfig.width = '40%';
    dialogConfig.data = {
      title: title,
      message: message,
      type: type
    }

    const modalDialog = this._matDialog.open(ConfirmDialog, dialogConfig);
    const res = await firstValueFrom(modalDialog.afterClosed());
    return res;
  }
}
