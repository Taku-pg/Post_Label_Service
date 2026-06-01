import { Type } from "./type.model";

export interface Item{
    productName: string,
    amount: number,
    price: number,
    weight: number,
    countryOfOrigin: string|null,
    type: Type 
}