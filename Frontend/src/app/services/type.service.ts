import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root'
})
export class TypeService{
    private _apiService = inject(ApiService);

    types = toSignal(this._apiService.getAllType());
}