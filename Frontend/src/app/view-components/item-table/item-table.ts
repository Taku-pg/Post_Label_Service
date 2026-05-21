import { Component, inject, input, computed } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-item-table',
  imports: [],
  templateUrl: './item-table.html',
  styleUrl: './item-table.css',
})
export class ItemTable {
  isReadOnly = input<boolean>(false);
  deliveryService = inject(DeliveryService);


  totalValues = computed(()=>{
    const contents = this.deliveryService.deliveryInfo().contents;

    const totalAmount: number = contents.map(i=>i.amount).reduce((acc,crr)=>acc+crr,0);
    
    const toatlPrice: number = contents.map(i=>{
      const base: number = i.price*i.amount;
      return Math.floor(base*100)/100
    }).reduce((acc,crr)=>acc+crr,0);

    const totalWeight: number = contents.map(i=>{
      const base = i.weight*i.amount;
      return Math.floor(base*100)/100
    }).reduce((acc,crr)=>acc+crr,0);

    return {
      toatlPrice: toatlPrice,
      totalAmount: totalAmount,
      totalWeight: totalWeight
    }
  });

  onClickDelete(index: number){
    const contents = this.deliveryService.deliveryInfo().contents;
    const targetItem = contents.at(index);
    this.deliveryService.removeItem(targetItem!);
  }

}
