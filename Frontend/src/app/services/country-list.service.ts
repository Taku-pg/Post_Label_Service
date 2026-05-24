import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

interface CountryName{
    name: {
        common: string,
        officail: string
    }
}

@Injectable({
    providedIn: 'root'
})
export class CountryListService{
    private _httpClient = inject(HttpClient);

    countries = toSignal(this._httpClient.get<CountryName[]>('https://restcountries.com/v3.1/all?fields=name'));
}