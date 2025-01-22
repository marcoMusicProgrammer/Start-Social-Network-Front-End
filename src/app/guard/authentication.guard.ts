import {CanActivateFn, Router} from '@angular/router';
import {CredentialService} from '../services/credential.service';
import {inject} from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {

  let credentialService: CredentialService = inject(CredentialService);
  let router: Router = inject(Router);
  let token: string | null = credentialService.token;


  let id = route.paramMap.get("id")

  if(token == null || id == null) {
    router.navigate(['/login']);
    return false;
  } else {

    let splittedToken: string[] = token.split("-")
    let idToken = splittedToken[1];

    if(idToken != id)
    {
      router.navigate(['/login']);
      return false;
    }

    // Creare nuovo componente per homepage pubblicas
  }

  return true;
};
