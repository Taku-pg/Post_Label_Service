import { Component, computed, inject, input } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { type DeliveryModel } from '../../models/delivery.model';

@Component({
  selector: 'app-delivery-info-form',
  imports: [ReactiveFormsModule],
  templateUrl: './delivery-info-form.html',
  styleUrl: './delivery-info-form.css',
})
export class DeliveryInfoForm {
  private _fb = inject(FormBuilder);
  deliveryModel = input.required<DeliveryModel>();
  isReadOnly = input<boolean>(false);

  isInternational = computed(()=>{
    console.log(this.deliveryModel());
    return this.deliveryModel()!.deliveryType === 'International';
  });
  senderInfo = computed(()=>{
      return this.deliveryModel()!.deliveryInfo?.sender;
  });
  senderAddress = computed(()=>{
      return this.deliveryModel()!.deliveryInfo?.senderAddress;
  });
  receiverAddress = computed(()=>{
      return this.deliveryModel()!.deliveryInfo?.receiverAddress;
  });
  deliveryOption = computed(()=>{
    return this.deliveryModel()!.deliveryInfo?.deliveryOption;
  }); 
  deliveryPurpose = computed(()=>{
    return this.deliveryModel()!.deliveryInfo?.deliveryPurpose;
  });
  //deliveryInfo = this._deliveryService.deliveryInfo().deliveryInfo;
  


  deliveryInfoForm =computed(()=>{
    console.log(this.deliveryOption());
    return this._fb.group({
    firstName: [this.senderInfo()?.firstName, Validators.required],
    lastName: [this.senderInfo()?.lastName, Validators.required],
    email: [this.senderInfo()?.email, [Validators.required, Validators.email]],
    phone: [this.senderInfo()?.phone, Validators.required],
    company: [this.senderInfo()?.company],
    senderStreet: [this.senderAddress()?.street, Validators.required],
    senderCity: [this.senderAddress()?.city, Validators.required],
    senderZip: [this.senderAddress()?.zip, Validators.required],
    senderCountry: [this.senderAddress()?.country ?? ''],
    receiverStreet: [this.receiverAddress()?.street, Validators.required],
    receiverCity: [this.receiverAddress()?.city, Validators.required],
    receiverZip: [this.receiverAddress()?.zip, Validators.required],
    receiverCountry: [this.receiverAddress()?.country ?? ''],
    deliveryOption: [
      this.deliveryOption() ?? 'Standard', 
      Validators.required],
    deliveryPurpose: [
      this.deliveryPurpose() ??'Gift', 
      ]
  })
  }) 

  validate(): boolean{
    if(this.deliveryInfoForm().invalid){
      this.deliveryInfoForm().markAllAsTouched;
      return false;
    }
    return true;
  }

  formValue(){
    return this.deliveryInfoForm().value;
  }
}
