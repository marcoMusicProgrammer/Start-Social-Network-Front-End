import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {ActivatedRouteSnapshot, provideRouter} from '@angular/router';
import { tokenAdderInterceptor } from './services/token-adder.interceptor'

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenAdderInterceptor])),
    importProvidersFrom(
    ),

  ]
};
