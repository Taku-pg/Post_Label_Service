import { DeliveryInfo } from "./deliveryInfo.model"
import { type Item } from "./item.model"

export interface DeliveryModel{
    deliveryType: string|null, 
    deliveryInfo: DeliveryInfo|null,
    contents: Item[]
}