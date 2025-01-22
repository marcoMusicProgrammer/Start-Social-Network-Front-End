import { HttpInterceptorFn } from '@angular/common/http';
import {CredentialService} from './credential.service';
import {inject} from '@angular/core';

export const tokenAdderInterceptor: HttpInterceptorFn = (req, next) => {

  const credentialService: CredentialService = inject(CredentialService);
  console.log(credentialService.token);

  if(credentialService.token)
  {
    let modifiedRequest = req.clone({setHeaders:{token: credentialService.token}});
    return next(modifiedRequest);
  }

  return next(req);
};
