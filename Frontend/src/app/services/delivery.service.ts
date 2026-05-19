import { Injectable, signal } from "@angular/core";
import { type DeliveryModel } from "../models/delivery.model";
import { type Item } from "../models/item.model";
import { type DeliveryInfo } from "../models/deliveryInfo.model";

@Injectable({
    providedIn: 'root'
})
export class DeliveryService{
    private _deliveryInfo = signal<DeliveryModel>({
        deliveryType: null,
        deliveryInfo: null,
        contents: []
    });

    readonly deliveryInfo = this._deliveryInfo.asReadonly();
    
    reset(){
        this._deliveryInfo.set({
            deliveryType:null,
            deliveryInfo:null,
            contents: []
        });
    }

    setDeliveryType(deliveryType: string){
        this._deliveryInfo.update(curr=>({...curr, deliveryType: deliveryType}));
    }

    setDeliveryInfo(deliveryInfo: DeliveryInfo){
        this._deliveryInfo.update(curr=>({...curr, deliveryInfo: deliveryInfo}));
    }

    setContents(contents: Item[]){
        this._deliveryInfo.update(curr=>({...curr, contents: contents}));
    }

    addItem(item: Item){
        const contents = this._deliveryInfo().contents;
        contents.push(item);
        this.setContents(contents);
    }

}