import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item-table',
  imports: [],
  templateUrl: './item-table.html',
  styleUrl: './item-table.css',
})
export class ItemTable {
  isReadOnly = input<boolean>(false);
}
