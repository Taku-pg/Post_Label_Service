import { Component, inject, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-delivery-search',
  imports: [ReactiveFormsModule],
  templateUrl: './delivery-search.html',
  styleUrl: './delivery-search.css',
})
export class DeliverySearch implements OnInit{
  private _router = inject(Router);
  private _deliveryService = inject(DeliveryService);
  private _apiService = inject(ApiService);

  trackingIdControl = new FormControl('', Validators.required);

  ngOnInit(){
    this._deliveryService.reset();
  }

  onClickSearch(){
    this.setNotFoundError();
    return;
    if(this.trackingIdControl.invalid){
      this.trackingIdControl.markAsTouched();
      return;
    }
    const trackingId = this.trackingIdControl.value;
    this._apiService.getDeliveryByTrackingId(trackingId!).subscribe({
      next: (res)=>{

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
