import { Component, inject, input, computed, output, Signal } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-table',
  imports: [],
  templateUrl: './item-table.html',
  styleUrl: './item-table.css',
})
export class ItemTable {
  isReadOnly = input<boolean>(false);
  deliveryService = inject(DeliveryService);
  items = input<any[]>();
  removeIndex = output<Item>();


  totalValues = computed(()=>{
    const totalAmount: number = this.items()!.map(i=>i.amount).reduce((acc,crr)=>acc+crr,0);
    
    const totalPriceNum: number = this.items()!.map(i=>{
      const base: number = i.price*i.amount;
      return Math.floor(base*100)/100
    }).reduce((acc,crr)=>acc+crr,0);

    const totalWeightNum: number = this.items()!.map(i=>{
      const base = i.weight*i.amount;
      return Math.floor(base*1000)/1000;
    }).reduce((acc,crr)=>acc+crr,0);

    const totalPrice = totalPriceNum.toFixed(2);
    const totalWeight = totalWeightNum.toFixed(3);
    

    return {
      totalPrice: totalPrice,
      totalAmount: totalAmount,
      totalWeight: totalWeight
    }
  });

  onClickDelete(index: number){
    const targetItem = this.items()!.at(index);
    this.removeIndex.emit(targetItem!);
  }

}
