import { Injectable, signal } from "@angular/core";
import { DeliveryStatusModel } from "../models/delivery_status.model";
import { DeliveryModel } from "../models/delivery.model";
import { DeliveryInfo } from "../models/deliveryInfo.model";


const DEFAULT_DELIVERY_STATUS_MODEL: DeliveryStatusModel = {
    trackingId: null,
    registeredDate: null,
    delivery: null,
    deliveryHistory: []
}

@Injectable({
    providedIn: 'root'
})
export class DeliveryStatusService {
    private _deliveryStatus = signal<DeliveryStatusModel>(DEFAULT_DELIVERY_STATUS_MODEL);

    readonly deliveryStatus = this._deliveryStatus.asReadonly();

    reset() {
        this._deliveryStatus.set(DEFAULT_DELIVERY_STATUS_MODEL);
    }

    set(deliveryStatus: DeliveryStatusModel) {
        this._deliveryStatus.set(deliveryStatus);
    }
}