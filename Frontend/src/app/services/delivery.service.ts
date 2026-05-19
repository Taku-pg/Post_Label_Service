import { effect, Injectable, signal } from "@angular/core";
import { type DeliveryModel } from "../models/delivery.model";
import { type Item } from "../models/item.model";
import { type DeliveryInfo } from "../models/deliveryInfo.model";


const DEFAULT_DELIVERY_MOEDL: DeliveryModel = {
    deliveryType: null,
    deliveryInfo: null,
    contents: []
}

@Injectable({
    providedIn: 'root'
})
export class DeliveryService{
    private readonly KEY = 'session_key';
    private _deliveryInfo = signal<DeliveryModel>(this.load());

    readonly deliveryInfo = this._deliveryInfo.asReadonly();

    constructor(){
        effect(()=>{
            const data = this._deliveryInfo();
            sessionStorage.setItem(this.KEY, JSON.stringify(data));
        })
    }

    private load(): DeliveryModel{
        const saved = sessionStorage.getItem(this.KEY);
        if(!saved){
            return DEFAULT_DELIVERY_MOEDL;
        }

        try{
            return JSON.parse(saved);
        }catch{
            return DEFAULT_DELIVERY_MOEDL;
        }
    }
    
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
        console.log(deliveryInfo);
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