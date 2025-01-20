import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  loginUser(toInsert: UserDTOLoginReq): Observable<UserDTOLoginReq> {
    return this.http.post<UserDTOLoginReq>("/api/authentication/login",toInsert);
  }

  signInUser(toInsert: UserDTOReq): Observable<UserDTOReq> {
    return this.http.post<UserDTOReq>("/api/authentication/register", toInsert);
  }


}
