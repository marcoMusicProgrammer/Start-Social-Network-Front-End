import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserDTOReq} from '../models/UserDTOReq';
import {catchError, Observable, throwError} from 'rxjs';
import {UserDTOLoginReq} from '../models/UserDTOLoginReq';
import {UserDTOResp} from '../models/UserDTOResp';
import {Post} from '../models/Post';
import {ErrorResponse} from '../models/ErrorResponse';

@Injectable({
  providedIn: 'root',
})
export class RequestClientService {

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserDTOResp[]> {
    return this.http.get<UserDTOResp[]>("/api/users")
  }

  getAllUsersPost(): Observable<Post[]> {
    return this.http.get<Post[]>("/api/posts").pipe(
      catchError(this.handleError)
    )
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
