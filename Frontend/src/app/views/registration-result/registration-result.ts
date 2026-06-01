import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-registration-result',
  imports: [],
  templateUrl: './registration-result.html',
  styleUrl: './registration-result.css',
})
export class RegistrationResult {
  private _router = inject(Router);
  private _deliveryServie = inject(DeliveryService);

  trackingId = computed(()=>{
    return this._deliveryServie.trackingId();
  })

  onClickMain(){
    this._router.navigate(['delivery-type']);
  }
}
