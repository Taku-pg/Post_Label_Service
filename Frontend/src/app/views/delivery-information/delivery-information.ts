import { Component } from '@angular/core';
import { Progress } from "../../view-components/progress/progress";
import { DeliveryInfoForm } from "../../view-components/delivery-info-form/delivery-info-form";

@Component({
  selector: 'app-delivery-information',
  imports: [Progress, DeliveryInfoForm],
  templateUrl: './delivery-information.html',
  styleUrl: './delivery-information.css',
})
export class DeliveryInformation {
  //async pipeでhtmlに直でobservableの値を表示できる
  //ts
  //user$ = this.userService.user$; 
  //html
  //<div *ngIf="user$ | async as user">
  //<p>名前：{{ user.name }}</p>
  //</div>
}
