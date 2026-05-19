import { Component, inject, input } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-delivery-info-form',
  imports: [],
  templateUrl: './delivery-info-form.html',
  styleUrl: './delivery-info-form.css',
})
export class DeliveryInfoForm {
  isReadOnly = input<boolean>(false);
  private _deliveryService = inject(DeliveryService);
  isInternational: boolean = this._deliveryService.deliveryInfo().deliveryType === 'international'; 
}
