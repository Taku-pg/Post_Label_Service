import { Component } from '@angular/core';
import { Progress } from "../../view-components/progress/progress";
import { ItemTable } from "../../view-components/item-table/item-table";

@Component({
  selector: 'app-content-information',
  imports: [Progress, ItemTable],
  templateUrl: './content-information.html',
  styleUrl: './content-information.css',
})
export class ContentInformation {

}
