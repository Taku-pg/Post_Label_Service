import { Component } from '@angular/core';
import { Progress } from "../../view-components/progress/progress";
import { DeliveryInformation } from "../delivery-information/delivery-information";
import { ContentInformation } from "../content-information/content-information";
import { DeliveryInfoForm } from "../../view-components/delivery-info-form/delivery-info-form";
import { ItemTable } from "../../view-components/item-table/item-table";

@Component({
  selector: 'app-confirmation',
  imports: [Progress, DeliveryInfoForm, ItemTable],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation {

}
