import { Component, inject, OnInit, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error {
  private _router = inject(Router);
  title = '';
  message = '';
  activatedRouter = inject(ActivatedRoute);
  errorCode = toSignal(
    this.activatedRouter.data
  )

  constructor() {
    effect(() => {
      const code=this.errorCode();
      if(!code) return;

      switch (code['errorCode']) {
        case 404:
          this.title = '404 not found';
          this.message = 'Page not found';
          break;
        case 500:
          this.title = '500 internal server error';
          this.message = 'Server error occurred. \n Please try again later.';
          break;
      }
    });
  }

  onClickMain(){
    this._router.navigate(['delivery-type']);
  }
}
