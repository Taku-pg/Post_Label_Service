import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryStatusService } from '../../services/delivery_status.service';

@Component({
  selector: 'app-delivery-overview',
  imports: [],
  templateUrl: './delivery-overview.html',
  styleUrl: './delivery-overview.css',
})
export class DeliveryOverview {
  private _router = inject(Router);
  private _deliveryStatusService = inject(DeliveryStatusService);

  deliveryStatus = this._deliveryStatusService.deliveryStatus();
  
  trackingId = this.deliveryStatus.trackingId;
  registeredDate = this.deliveryStatus.registeredDate;
  deliveryType = this.deliveryStatus.delivery?.deliveryType;
  

  onClickDetail(){
    this._router.navigate(['delivery-detail']);
  }

  onClickBack(){
    this._router.navigate(['delivery-search']);
  }
}
