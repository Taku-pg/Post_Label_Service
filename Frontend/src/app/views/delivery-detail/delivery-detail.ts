import { Component, inject } from '@angular/core';
import { DeliveryInfoForm } from "../../view-components/delivery-info-form/delivery-info-form";
import { ItemTable } from "../../view-components/item-table/item-table";
import { Router } from '@angular/router';
import { CdkObserveContent } from "@angular/cdk/observers";

@Component({
  selector: 'app-delivery-detail',
  imports: [DeliveryInfoForm, ItemTable, CdkObserveContent],
  templateUrl: './delivery-detail.html',
  styleUrl: './delivery-detail.css',
})
export class DeliveryDetail {
  private _router = inject(Router);

  onClickBack(){
    this._router.navigate(['delivery-overview']);
  }
}
