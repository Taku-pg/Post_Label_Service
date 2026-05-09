import { Component, input } from '@angular/core';

@Component({
  selector: 'app-delivery-info-form',
  imports: [],
  templateUrl: './delivery-info-form.html',
  styleUrl: './delivery-info-form.css',
})
export class DeliveryInfoForm {
  isReadOnly = input<boolean>(false);
}
