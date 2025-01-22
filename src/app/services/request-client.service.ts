import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserDTOReq} from '../models/UserDTOReq';
import {catchError, Observable, throwError} from 'rxjs';
import {UserDTOLoginReq} from '../models/UserDTOLoginReq';
import {UserDTOResp} from '../models/UserDTOResp';
import {PostDTOResp} from '../models/PostDTOResp';
import {ErrorResponse} from '../models/ErrorResponse';
import {PostDTOReq} from '../models/PostDTOReq';
import {ProfileDTOResp} from '../models/ProfileDTOResp';
import {ProfileDTOReq} from '../models/ProfileDTOReq';

@Injectable({
  providedIn: 'root',
})
export class RequestClientService {

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserDTOResp[]> {
    return this.http.get<UserDTOResp[]>("/api/profiles/all")
  }

  getProfile(): Observable<ProfileDTOResp> {
    return this.http.get<ProfileDTOResp>("/api/profiles").pipe(
      catchError(this.handleError)
    )
  }

  saveProfile(toInsert: ProfileDTOReq): Observable<ProfileDTOResp> {
    return this.http.post<ProfileDTOResp>("/api/profiles/save", toInsert).pipe(
      catchError(this.handleError)
    )
  }

  saveImage(toInsert: FormData): Observable<string> {
    return this.http.post<string>("/api/profiles/saveBackdropImage", toInsert).pipe(
      catchError(this.handleError)
    )
  }

  // getProfileImages(): Observable<> {
  //
  // }

  getAllUsersPost(): Observable<PostDTOResp[]> {
    return this.http.get<PostDTOResp[]>("/api/posts").pipe(
      catchError(this.handleError)
    )
  }

  newPost(toInsert: PostDTOReq): Observable<PostDTOReq> {
    return this.http.post<PostDTOReq>("/api/posts", toInsert).pipe(
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
