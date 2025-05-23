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

  private _token: string | null = null;

  constructor(private http: HttpClient) {}
  errorResponse: ErrorResponse | null = null;
  message: string | null = null;

  get token(): string | null {
    // Retrieve the token from localStorage if not already in memory
    if (!this._token) {
      this._token = localStorage.getItem('authToken');
    }
    return this._token;
  }

  set token(value: string | null) {
    this._token = value;
    if (value) {
      localStorage.setItem('authToken', value); // Save the token to localStorage
      console.log('Token salvato in localStorage:', localStorage.getItem('authToken'));
    } else {
      localStorage.removeItem('authToken'); // Remove the token from localStorage
    }
  }

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
