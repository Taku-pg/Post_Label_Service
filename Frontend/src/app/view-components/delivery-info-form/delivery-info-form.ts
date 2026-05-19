import { Component, inject, input } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-delivery-info-form',
  imports: [ReactiveFormsModule],
  templateUrl: './delivery-info-form.html',
  styleUrl: './delivery-info-form.css',
})
export class DeliveryInfoForm {
  private _fb = inject(FormBuilder);
  private _deliveryService = inject(DeliveryService);

  isReadOnly = input<boolean>(false);
  isInternational: boolean = this._deliveryService.deliveryInfo().deliveryType === 'international';

  deliveryInfo = this._deliveryService.deliveryInfo().deliveryInfo;
  senderInfo = this.deliveryInfo?.sender;
  senderAddress = this.deliveryInfo?.senderAddress;
  receiverAddress = this.deliveryInfo?.receiverAddress;


  deliveryInfoForm = this._fb.group({
    firstName: [this.senderInfo?.firstName, Validators.required],
    lastName: [this.senderInfo?.lastName, Validators.required],
    email: [this.senderInfo?.email, [Validators.required, Validators.email]],
    phone: [this.senderInfo?.phone, Validators.required],
    company: [this.senderInfo?.company],
    senderStreet: [this.senderAddress?.street, Validators.required],
    senderCity: [this.senderAddress?.city, Validators.required],
    senderZip: [this.senderAddress?.zip, Validators.required],
    senderCountry: [this.senderAddress?.country],
    receiverStreet: [this.receiverAddress?.street, Validators.required],
    receiverCity: [this.receiverAddress?.city, Validators.required],
    receiverZip: [this.receiverAddress?.zip, Validators.required],
    receiverCountry: [this.receiverAddress?.country],
    deliveryOption: [this.deliveryInfo?.deliveryOption, Validators.required],
    deliveryPurpose: [this.deliveryInfo?.deliveryPurpose, Validators.required]
  })

  validate(): boolean{
    if(this.deliveryInfoForm.invalid){
      this.deliveryInfoForm.markAllAsTouched;
      return false;
    }
    return true;
  }

  formValue(){
    return this.deliveryInfoForm.value;
  }
}
