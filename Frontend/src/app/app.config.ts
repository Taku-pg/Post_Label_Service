import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { routes } from './app.routes';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { catchError } from 'rxjs';

function errorHandler(request: HttpRequest<unknown>, next: HttpHandlerFn){
  const router = inject(Router);

  return next(request).pipe(
    catchError(err=>{
      if(err.status === 500){
        router.navigate(['error/500']);
      }
      throw err;
    })
  )
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([errorHandler])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
