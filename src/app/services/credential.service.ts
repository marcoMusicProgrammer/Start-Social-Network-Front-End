import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserDTOLoginReq} from '../models/UserDTOLoginReq';
import {catchError, Observable, throwError} from 'rxjs';
import {LoginResponse} from '../models/LoginResponse';
import {ErrorResponse} from '../models/ErrorResponse';
import {UserDTOReq} from '../models/UserDTOReq';
import {SignInResponse} from '../models/SignInResponse';
// import {readSpanComment} from '@angular/compiler-cli/src/ngtsc/typecheck/src/comments';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor(private http: HttpClient) {}
  token: string | null = null;
  errorResponse: ErrorResponse | null = null;
  message: string | null = null;

  loginUser(toInsert: UserDTOLoginReq): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("/api/authentication/login",toInsert, {responseType: "json"}).pipe(
      catchError(this.handleError)
    );
  }

  signInUser(toInsert: UserDTOReq): Observable<SignInResponse> {
    return this.http.post<SignInResponse>("/api/authentication/register",toInsert, {responseType: "json"}).pipe(
      catchError(this.handleError)
    );
  }

  // login(credenziali :any):void
  // {
  //   this.http.post("/api/authentication/login", credenziali,{responseType: "text"}).subscribe(
  //     resp=>
  //     {
  //       this.token = resp;
  //       console.log(this.token);
  //     },
  //     err => {
  //       this.errorResponse = err;
  //       console.log(err)
  //     }
  //   )
  // }

  // register(user:any ):void
  // {
  //   this.http.post("/api/authentication/register", user,{responseType: "text"}).subscribe(
  //     resp=>
  //     {
  //       console.log(resp)
  //     }
  //   )
  // }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorResponse: ErrorResponse;

    if (error.error instanceof Object) {
      // Errore JSON strutturato ricevuto dal backend
      errorResponse = error.error as ErrorResponse;
    } else {
      // Errore generico o non strutturato
      errorResponse = {
        status: error.status,
        message: error.message || 'Errore sconosciuto',
        timestamp: Date.now()
      };
    }

    console.error('Errore ricevuto:', errorResponse);
    return throwError(() => errorResponse);
  }

}
