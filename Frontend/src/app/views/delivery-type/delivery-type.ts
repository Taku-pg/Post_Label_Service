import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
  router = inject(Router);
  deliveryService = inject(DeliveryService);
  delivery = this.deliveryService.deliveryInfo;

  constructor(){}

  ngOnInit(){
    this.deliveryService.reset();
  }

  onSelectDomestic(){
    this.router.navigate(['delivery-info']);
    this.deliveryService.setDeliveryType('domestic');
  }

  onSelectInternational(){
    this.router.navigate(['delivery-info']);
    this.deliveryService.setDeliveryType('international');
  }

}
