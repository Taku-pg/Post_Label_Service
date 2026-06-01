import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { DeliveryStatusService } from '../../services/delivery_status.service';

@Component({
  selector: 'app-delivery-search',
  imports: [ReactiveFormsModule],
  templateUrl: './delivery-search.html',
  styleUrl: './delivery-search.css',
})
export class DeliverySearch implements OnInit{
  private _router = inject(Router);
  private _deliveryStatusService = inject(DeliveryStatusService);
  private _apiService = inject(ApiService);

  trackingIdControl = new FormControl('', Validators.required);

  ngOnInit(){
    this._deliveryStatusService.reset();
  }

  onClickSearch(){
    if(this.trackingIdControl.invalid){
      this.trackingIdControl.markAsTouched();
      return;
    }
    const trackingId = this.trackingIdControl.value;

    this._apiService.getDeliveryByTrackingId(trackingId!).subscribe({
      next: (res)=>{
        this._router.navigate(['delivery-overview']);
      },
      error: ()=>{
        this.setNotFoundError();
      }
    });
  }

  onClickBack(){
    this._router.navigate(['delivery-type']);
  }

  setNotFoundError(){
    console.log('called');
    this.trackingIdControl.setErrors({
      notFound: true
    });
    this.trackingIdControl.markAsTouched();
  }
}
