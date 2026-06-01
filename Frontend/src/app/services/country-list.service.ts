import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class CountryListService{
    private _apiService = inject(ApiService);

    countries = toSignal(this._apiService.getCountryList());
}