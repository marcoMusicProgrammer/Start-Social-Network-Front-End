import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {UserDTOResp} from '../models/UserDTOResp';
import {PostDTOResp} from '../models/PostDTOResp';
import {ErrorResponse} from '../models/ErrorResponse';
import {PostDTOReq} from '../models/PostDTOReq';
import {ProfileDTOResp} from '../models/ProfileDTOResp';
import {ProfileDTOReq} from '../models/ProfileDTOReq';
import {VideogameResp} from '../models/VideogameResp';
import {LoginResponse} from '../models/LoginResponse';
import {VideogameDetailDTO} from '../models/VideogameDetailDTO';
import {NewsDTO} from '../models/NewsDTO';
import {RecommendationDTO} from '../models/RecommendationDTO';
import {FriendSummuryDTO} from '../models/FriendSummuryDTO';

@Injectable({
  providedIn: 'root',
})
export class RequestClientService {

  constructor(private http: HttpClient) {}

  deleteFriendFromFollowing(toInsert: number): Observable<FriendSummuryDTO>{
    return this.http.delete<FriendSummuryDTO>(`/api/friends/followings/${toInsert}`).pipe(
        catchError(this.handleError)
    )
  }

  getAllFollowers(): Observable<FriendSummuryDTO[]>{
    return this.http.get<FriendSummuryDTO[]>(`/api/friends/follower`).pipe(
      catchError(this.handleError)
    )
  }
  getAllFollowing(): Observable<FriendSummuryDTO[]>{
    return this.http.get<FriendSummuryDTO[]>(`/api/friends/following`).pipe(
      catchError(this.handleError)
    )
  }

  getStrangerUserHisFollower(toInsert: number): Observable<FriendSummuryDTO[]> {
    return this.http.get<FriendSummuryDTO[]>(`/api/friends/followers/${toInsert}`).pipe(
      catchError(this.handleError)
    );
  }

  getStrangerUserHisFollowing(toInsert: number): Observable<FriendSummuryDTO[]> {
    return this.http.get<FriendSummuryDTO[]>(`/api/friends/followings/${toInsert}`).pipe(
      catchError(this.handleError)
    );
  }

  addFriend(toInsert: number): Observable<FriendSummuryDTO> {
    return this.http.post<FriendSummuryDTO>(`/api/friends/add/${toInsert}`, {responseType: "json"}).pipe(
      catchError(this.handleError)
    )
  }

  getUserPostByProfileId(toInsert: number): Observable<PostDTOResp[]> {
    return this.http.get<PostDTOResp[]>(`/api/posts/external/${toInsert}`).pipe(
      catchError(this.handleError)
    )
  }

  getOtherUsersPost(): Observable<PostDTOResp[]> {
    return this.http.get<PostDTOResp[]>("/api/posts/activity").pipe(
      catchError(this.handleError))
  }

  updateVideogame(toUpdate:VideogameResp): Observable<LoginResponse> {
    return this.http.put<LoginResponse>("/api/videogames",toUpdate);
  }

  getPreferredVideogames():Observable<VideogameResp[]> {
    return this.http.get<VideogameResp[]>("/api/videogames/preferred");
  }

  getPreferredVideogamesStranger(strangerId: number): Observable<VideogameResp[]> {
    return this.http.get<VideogameResp[]>(`/api/videogames/preferred/${strangerId}`);
  }

  getVideogameDetail(appId:number):Observable<VideogameDetailDTO> {
    return this.http.get<VideogameDetailDTO>(`/api/videogames/${appId}`);
  }

  getNewsVideogame(appId:number):Observable<NewsDTO[]> {
    return this.http.get<NewsDTO[]>(`/api/steam/news/${appId}`);
  }

  getRecommendations():Observable<RecommendationDTO[]> {
    return this.http.get<RecommendationDTO[]>(`/api/steam/recommendations`);
  }

  getAllVideogames(searchValue:string): Observable<VideogameResp[]> {
    return this.http.get<VideogameResp[]>(`/api/videogames?name_like=${searchValue}`);
  }

  getAllUsers(): Observable<UserDTOResp[]> {
    return this.http.get<UserDTOResp[]>("/api/profiles/all");
  }

  getProfile(): Observable<ProfileDTOResp> {
    return this.http.get<ProfileDTOResp>("/api/profiles").pipe(
      catchError(this.handleError)
    )
  }

  getProfileId(toInsert: number): Observable<ProfileDTOResp> {
    return this.http.get<ProfileDTOResp>("/api/profiles/" + toInsert);
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
