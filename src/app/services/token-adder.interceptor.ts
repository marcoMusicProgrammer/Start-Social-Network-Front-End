import { HttpInterceptorFn } from '@angular/common/http';
import {CredentialService} from './credential.service';
import {inject} from '@angular/core';

export const tokenAdderInterceptor: HttpInterceptorFn = (req, next) => {

  if(localStorage.getItem('authToken'))
  {
    let modifiedRequest = req.clone({setHeaders:{token: localStorage.getItem('authToken')!}});
    return next(modifiedRequest);
  }

  return next(req);
};
