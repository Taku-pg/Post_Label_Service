import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-overview',
  imports: [],
  templateUrl: './delivery-overview.html',
  styleUrl: './delivery-overview.css',
})
export class DeliveryOverview {
  private _router = inject(Router);

  onClickDetail(){
    this._router.navigate(['delivery-detail']);
  }

  onClickBack(){
    this._router.navigate(['delivery-search']);
  }
}
