import { Component, inject } from '@angular/core';
import { DeliveryInfoForm } from "../../view-components/delivery-info-form/delivery-info-form";
import { ItemTable } from "../../view-components/item-table/item-table";
import { Router } from '@angular/router';
import { DeliveryService } from '../../services/delivery.service';
import { DeliveryStatusService } from '../../services/delivery_status.service';

@Component({
  selector: 'app-delivery-detail',
  imports: [DeliveryInfoForm, ItemTable],
  templateUrl: './delivery-detail.html',
  styleUrl: './delivery-detail.css',
})
export class DeliveryDetail {
  private _router = inject(Router);
  private _deliveryStatusService = inject(DeliveryStatusService);
  deliveryStatus = this._deliveryStatusService.deliveryStatus;

  onClickBack(){
    this._router.navigate(['delivery-overview']);
  }
}
