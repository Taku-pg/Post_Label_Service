import { Component, computed, inject, input, Signal } from '@angular/core';
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

  countries = computed(()=>{
    console.log(this._countryListService.countries());
    return this._countryListService.countries()?.sort(
      (a,b)=>a.name.common.localeCompare(b.name.common));
  })
  isInternational = computed(() => {
    console.log(this.deliveryModel());
    return this.deliveryModel().deliveryType === 'international';
  });
  sender = computed(() => {
    return this.deliveryModel().deliveryInfo?.sender;
  });
  receiver = computed(() => {
    return this.deliveryModel().deliveryInfo?.receiver;
  });
  deliveryOption = computed(() => {
    return this.deliveryModel().deliveryInfo?.deliveryOption;
  });
  deliveryPurpose = computed(() => {
    return this.deliveryModel().deliveryInfo?.deliveryPurpose;
  });
  returnMethod = computed(()=>{
    return this.deliveryModel().deliveryInfo?.returnMethod;
  })

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;


  //next: add validation
  //select option
  //api logic

  deliveryInfoForm = computed(() => {
    console.log(this.deliveryOption());
    return this._fb.group({
      firstName: [this.sender()?.firstName, Validators.required],
      lastName: [this.sender()?.lastName, Validators.required],
      email: [this.sender()?.email, [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: [this.sender()?.phone, [Validators.required, Validators.pattern(this.phoneRegex)]],
      company: [this.sender()?.company],
      senderStreet: [this.sender()?.address.street, Validators.required],
      senderCity: [this.sender()?.address.city, Validators.required],
      senderZip: [this.sender()?.address.zip, Validators.required],
      senderCountry: [this.sender()?.address.country ?? ''],
      receiverFirstName: [this.receiver()?.firstName, Validators.required],
      receiverLastName: [this.receiver()?.lastName, Validators.required],
      receiverStreet: [this.receiver()?.address.street, Validators.required],
      receiverCity: [this.receiver()?.address.city, Validators.required],
      receiverZip: [this.receiver()?.address.zip, Validators.required],
      receiverCountry: [this.receiver()?.address.country ?? ''],
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
    console.log(this.countries())
    if (this.deliveryInfoForm().invalid) {
      this.deliveryInfoForm().markAllAsTouched();
      return false;
    }
    return true;
  }

  formValue() {
    return this.deliveryInfoForm().value;
  }
}
