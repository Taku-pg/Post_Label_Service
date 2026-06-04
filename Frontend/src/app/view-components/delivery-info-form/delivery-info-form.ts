import { Component, computed, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { type DeliveryModel } from '../../models/delivery.model';
import { CountryListService } from '../../services/country-list.service';

@Component({
  selector: 'app-delivery-info-form',
  imports: [ReactiveFormsModule],
  templateUrl: './delivery-info-form.html',
  styleUrl: './delivery-info-form.css',
})
export class DeliveryInfoForm {
  private _fb = inject(FormBuilder);
  private _countryListService = inject(CountryListService);
  deliveryModel = input.required<DeliveryModel>();
  isReadOnly = input<boolean>(false);

  countries = computed(() => {
    return this._countryListService.countries()?.sort(
      (a, b) => a.name.common.localeCompare(b.name.common));
  })
  isInternational = computed(() => {
    return this.deliveryModel().deliveryType === 'international';
  });
  sender = computed(() => {
    return this.deliveryModel().deliveryInfo?.sender;
  });
  receiver = computed(() => {
    return this.deliveryModel().deliveryInfo?.receiver;
  });
  itemType = computed(() => {
    return this.deliveryModel().deliveryInfo?.itemType;
  })
  deliveryOption = computed(() => {
    const option = this.deliveryModel().deliveryInfo?.deliveryOption;
    if (!option) {
      return null;
    }
    return option.toLowerCase();
  });
  deliveryPurpose = computed(() => {
    const purpose = this.deliveryModel().deliveryInfo?.deliveryPurpose;
    if(!purpose){
      return null;
    }
    return purpose.toLowerCase();
  });
  returnMethod = computed(() => {
    const method = this.deliveryModel().deliveryInfo?.returnMethod;
    if(!method){
      return null;
    }
    return method.toLowerCase();
  })

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,6}$/;
  zipRegex = /^[0-9]{5,9}$/;


  deliveryInfoForm = computed(() => {
    return this._fb.group({
      firstName: [this.sender()?.firstName, Validators.required],
      lastName: [this.sender()?.lastName, Validators.required],
      email: [this.sender()?.email, [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: [this.sender()?.phone, [Validators.required, Validators.pattern(this.phoneRegex)]],
      senderCompany: [this.sender()?.company],
      senderStreet: [this.sender()?.address.street, Validators.required],
      senderCity: [this.sender()?.address.city, Validators.required],
      senderZip: [this.sender()?.address.zip, [Validators.required, Validators.pattern(this.zipRegex)]],
      receiverFirstName: [this.receiver()?.firstName, Validators.required],
      receiverLastName: [this.receiver()?.lastName, Validators.required],
      receiverCompany: [this.receiver()?.company],
      receiverStreet: [this.receiver()?.address.street, Validators.required],
      receiverCity: [this.receiver()?.address.city, Validators.required],
      receiverZip: [this.receiver()?.address.zip, [Validators.required, Validators.pattern(this.zipRegex)]],
      receiverCountry: [this.receiver()?.address.country],
      itemType: [this.itemType()],
      deliveryOption: [
        this.deliveryOption() ?? 'standard',
        Validators.required],
      deliveryPurpose: [
        this.deliveryPurpose() ?? 'gift',
      ],
      returnMethod: [
        this.returnMethod() ?? 'same'
      ]
    })
  });

  validate(): boolean {
    if (this.deliveryInfoForm().invalid) {
      console.log(this.deliveryInfoForm().get('')?.errors);
      this.deliveryInfoForm().markAllAsTouched();
      return false;
    }
    return true;
  }

  formValue() {
    return this.deliveryInfoForm().value;
  }
}
