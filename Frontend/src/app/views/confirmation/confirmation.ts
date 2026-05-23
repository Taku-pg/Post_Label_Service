import { Component, inject } from '@angular/core';
import { Progress } from "../../view-components/progress/progress";
import { DeliveryInfoForm } from "../../view-components/delivery-info-form/delivery-info-form";
import { ItemTable } from "../../view-components/item-table/item-table";
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-confirmation',
  imports: [Progress, DeliveryInfoForm, ItemTable],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation {
  private _deliveryService = inject(DeliveryService);
  deliveryInfo = this._deliveryService.deliveryInfo;
}
