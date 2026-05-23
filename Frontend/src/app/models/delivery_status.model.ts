import { DeliveryModel } from "./delivery.model";

export interface DeliveryStatusModel{
    delivery: DeliveryModel|null,
    deliveryHistory: DeliveryHistory[]
}

interface DeliveryHistory{
    start: Date,
    end: Date|null,
    status: string
}