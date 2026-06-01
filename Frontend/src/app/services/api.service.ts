import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DeliveryModel } from "../models/delivery.model";
import { DeliveryStatusModel } from "../models/delivery_status.model";
import { CountryName } from "../models/country-name.model";
import { Type } from "../models/type.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService{
    private _httpClient = inject(HttpClient);

    registerDelivery(delivery: DeliveryModel){
        return this._httpClient.post('/api/v1/delivery/register',delivery);
    }

    getDeliveryByTrackingId(trackingId: string){
        return this._httpClient.get<DeliveryStatusModel>('/api/v1/delivery/${trackingId}');
    }

    getCountryList(){
        return this._httpClient.get<CountryName[]>('https://restcountries.com/v3.1/all?fields=name')
    }

    getAllType(){
        return this._httpClient.get<Type[]>('/api/v1/type');
    }
}