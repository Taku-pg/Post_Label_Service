import { DeliveryModel } from "./delivery.model";

export interface DeliveryStatusModel{
    trackingId: string|null,
    registeredDate: string|null,
    delivery: DeliveryModel|null,
    deliveryHistory: DeliveryHistory[]
}

interface DeliveryHistory{
    start: string,
    end: string|null,
    status: string
}