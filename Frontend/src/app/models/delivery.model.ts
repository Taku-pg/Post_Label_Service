import { type Item } from "./item.model"

export interface DeliveryModel{
    deliveryType: string|null,
    contents: Item[]
}