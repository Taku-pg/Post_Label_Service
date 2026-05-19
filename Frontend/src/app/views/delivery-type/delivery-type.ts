import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { Progress } from "../../view-components/progress/progress";
import { Router } from '@angular/router';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-delivery-type',
  imports: [Progress],
  templateUrl: './delivery-type.html',
  styleUrl: './delivery-type.css',
})
export class DeliveryType implements OnInit{
  private _router = inject(Router);
  private _deliveryService = inject(DeliveryService);

  constructor(){}

  ngOnInit(){
    this._deliveryService.reset();
  }

  onSelectDomestic(){
    this._router.navigate(['delivery-info']);
    this._deliveryService.setDeliveryType('domestic');
  }

  onSelectInternational(){
    this._router.navigate(['delivery-info']);
    this._deliveryService.setDeliveryType('international');
  }

}
