import { Routes } from '@angular/router';
import { DeliveryType } from './views/delivery-type/delivery-type';
import { DeliveryInformation } from './views/delivery-information/delivery-information';
import { ContentInformation } from './views/content-information/content-information';
import { Confirmation } from './views/confirmation/confirmation';
import { Error } from './views/error/error';
import { DeliverySearch } from './views/delivery-search/delivery-search';
import { DeliveryDetail } from './views/delivery-detail/delivery-detail';
import { DeliveryOverview } from './views/delivery-overview/delivery-overview';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'delivery-type',
        pathMatch: 'full'
    },
    {
        path: 'delivery-type',
        component: DeliveryType
    },
    {
        path: 'delivery-info',
        component: DeliveryInformation
    },
    {
        path: 'contents',
        component: ContentInformation
    },
    {
        path: 'confirmation',
        component: Confirmation
    },
    {
        path: 'delivery-search',
        component: DeliverySearch
    },
    {
        path: 'delivery-overview',
        component: DeliveryOverview
    },
    {
        path: 'delivery-detail',
        component: DeliveryDetail
    },
    {
        path: 'error/500',
        component: Error,
        data:{'errorCode':500}
    },
    {
        path: '**',
        component:Error,
        data: {'errorCode': 404}
    }
];
