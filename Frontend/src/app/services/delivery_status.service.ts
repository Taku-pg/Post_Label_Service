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

    setDemoData() {
        const demoInfo: DeliveryInfo = {
            sender: {
                firstName: 'John',
                lastName: 'Smith',
                email: 'john@gmail.com',
                phone: '+4827282822',
                company: null,
                address: {
                    street: 's1',
                    city: 'c1',
                    zip: 'z1',
                    country: 'United States'
                }
            },
            receiver: {
                address: {
                    street: 's2',
                    city: 'c2',
                    zip: 'z2',
                    country: 'United States'
                },
                firstName: 'Andy',
                lastName: 'Sam'
            },
            deliveryOption: 'express',
            deliveryPurpose: 'gift'
        }

        const demoDel: DeliveryModel = {
            deliveryType: 'international',
            deliveryInfo: demoInfo,
            contents: [
                {
                    productName: 'i1',
                    price: 100,
                    amount: 2,
                    weight: 0.1,
                    countryOfOrigin: 'United States',
                    type: 't1'
                },
                {
                    productName: 'i2',
                    price: 100,
                    amount: 2,
                    weight: 0.1,
                    countryOfOrigin: 'United States',
                    type: 't1'
                },
            ]
        }

        const demo: DeliveryStatusModel = {
            trackingId: 'abc-1234',
            registeredDate: '2021-01-02',
            delivery: demoDel,
            deliveryHistory: [
                {
                    start: '2021-01-02',
                    end: '2021-01-03',
                    status: 'Unpaid'
                },
                {
                    start: '2021-01-03',
                    end: '2021-01-04',
                    status: 'Pending'
                },
                {
                    start: '2021-01-04',
                    end: null,
                    status: 'Collected'
                }
            ]
        }


        this._deliveryStatus.set(demo);
    }
}