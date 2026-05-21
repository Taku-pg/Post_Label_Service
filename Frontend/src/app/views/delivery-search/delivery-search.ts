import { Component, inject, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-search',
  imports: [],
  templateUrl: './delivery-search.html',
  styleUrl: './delivery-search.css',
})
export class DeliverySearch implements OnInit{
  private _router = inject(Router);
  private _deliveryService = inject(DeliveryService);

  ngOnInit(){
    this._deliveryService.reset();
  }

  onClickSearch(){

  }
}
