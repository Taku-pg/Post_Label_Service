import { Component, inject, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-delivery-search',
  imports: [ReactiveFormsModule],
  templateUrl: './delivery-search.html',
  styleUrl: './delivery-search.css',
})
export class DeliverySearch implements OnInit{
  private _router = inject(Router);
  private _deliveryService = inject(DeliveryService);

  trackingIdControl = new FormControl('', Validators.required);

  ngOnInit(){
    this._deliveryService.reset();
  }

  onClickSearch(){
    if(this.trackingIdControl.invalid){
      this.trackingIdControl.markAsTouched();
      return;
    }
  }

  onClickBack(){
    this._router.navigate(['delivery-type']);
  }
}
