import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserDTOReq} from '../models/UserDTOReq';
import {Observable} from 'rxjs';
import {UserDTOLoginReq} from '../models/UserDTOLoginReq';
import {UserDTOResp} from '../models/UserDTOResp';

@Injectable({
  providedIn: 'root',
})
export class RequestClientService {

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserDTOResp[]> {
    return this.http.get<UserDTOResp[]>("/api/users")
  }

  // loginUser(toInsert: UserDTOLoginReq): Observable<String> {
  //   return this.http.post<String>("/api/authentication/login",toInsert);
  // }

  signInUser(toInsert: UserDTOReq): Observable<String> {
    return this.http.post<String>("/api/authentication/register", toInsert,);
  }


}
