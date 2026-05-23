import { Injectable, signal } from "@angular/core";
import { DeliveryStatusModel } from "../models/delivery_status.model";


const DEFAULT_DELIVERY_STATUS_MODEL: DeliveryStatusModel = {
    delivery: null,
    deliveryHistory: []
}

@Injectable({
    providedIn: 'root'
})
export class DeliveryStatusService{
    private _deliveryStatus = signal<DeliveryStatusModel>(DEFAULT_DELIVERY_STATUS_MODEL);

    readonly deliveryStatus = this._deliveryStatus.asReadonly();

    reset(){
        this._deliveryStatus.set(DEFAULT_DELIVERY_STATUS_MODEL);
    }

    set(deliveryStatus: DeliveryStatusModel){
        this._deliveryStatus.set(deliveryStatus);
    }
}