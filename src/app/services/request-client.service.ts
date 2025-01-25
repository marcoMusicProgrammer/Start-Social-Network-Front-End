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
import {VideogameResp} from '../models/VideogameResp';
import {LoginResponse} from '../models/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class RequestClientService {

  constructor(private http: HttpClient) {}



  updateVideogame(toUpdate:VideogameResp): Observable<LoginResponse> {
    return this.http.put<LoginResponse>("/api/videogames",toUpdate);
  }

  getPreferredVideogames():Observable<VideogameResp[]> {
    return this.http.get<VideogameResp[]>("/api/videogames/preferred");
  }

  getAllVideogames(): Observable<VideogameResp[]> {
    return this.http.get<VideogameResp[]>("/api/videogames");
  }

  getAllUsers(): Observable<UserDTOResp[]> {
    return this.http.get<UserDTOResp[]>("/api/profiles/all");
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

  saveBackdropImage(toInsert: FormData): Observable<string> {
    return this.http.post<string>("/api/profiles/saveBackdropImage", toInsert).pipe(
      catchError(this.handleError)
    )
  }

  //TODO Dire al backend di preparare API
  saveProfileImage(toInsert: FormData): Observable<string> {
    return this.http.post<string>("/api/profiles/saveProfileImage", toInsert).pipe(
      catchError(this.handleError)
    )
  }

  getBackdropProfileImage(toInsert: string): Observable<Blob> {
    return this.http
      .get(`/api/profiles/fileSystem/${toInsert}`,{responseType:'blob'})
      .pipe(catchError(this.handleError));
  }

  getProfileImage(toInsert: string): Observable<Blob> {
    return this.http
      .get(`/api/profiles/fileSystem/${toInsert}`,{responseType:"blob"})
      .pipe(catchError(this.handleError));
  }

  getAllUsersPost(): Observable<PostDTOResp[]> {
    return this.http.get<PostDTOResp[]>("/api/posts").pipe(
      catchError(this.handleError)
    )
  }

  newPost(toInsert: PostDTOReq): Observable<PostDTOResp> {
    return this.http.post<PostDTOResp>("/api/posts", toInsert).pipe(
      catchError(this.handleError)
    )
  }

  deleteUserPost(toInsert: number): Observable<string> {
    return this.http.delete<string>(`/api/posts/${toInsert}`).pipe(
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
