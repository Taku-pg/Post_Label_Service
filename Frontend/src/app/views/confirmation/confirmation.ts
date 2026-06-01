import { Component, computed, inject } from '@angular/core';
import { Progress } from "../../view-components/progress/progress";
import { DeliveryInfoForm } from "../../view-components/delivery-info-form/delivery-info-form";
import { ItemTable } from "../../view-components/item-table/item-table";
import { DeliveryService } from '../../services/delivery.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-confirmation',
  imports: [Progress, DeliveryInfoForm, ItemTable],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation {
  private _router = inject(Router);
  private _deliveryService = inject(DeliveryService);
  private _apiServive = inject(ApiService);

  deliveryInfo = this._deliveryService.deliveryInfo;
  isInternational = computed(()=>{
    return this.deliveryInfo().deliveryType === 'international'
  })

  onClickConfirm(){
    this._apiServive.registerDelivery(this.deliveryInfo()).subscribe({
      next: (res)=>{
        this._deliveryService.setTrackingId(<string>res);
        this._router.navigate(['registration-result']);
      },
      error: ()=>{
        console.log('error');
      } 
    })
    console.log(this.deliveryInfo());
  }

  onClickBack(){
    if(this.isInternational()){
      this._router.navigate(['contents']);
      return;
    }
    this._router.navigate(['delivery-info']);
  }
}
