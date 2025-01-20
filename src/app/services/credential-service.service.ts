import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {readSpanComment} from '@angular/compiler-cli/src/ngtsc/typecheck/src/comments';

@Injectable({
  providedIn: 'root'
})
export class CredentialServiceService {

  constructor(private http: HttpClient) {}
  token: any=null;

  login(credenziali :any):void
  {
    this.http.post("/api/authentication/login", credenziali,{responseType: "text"}).subscribe(
      resp=>
      {
        this.token = resp;
        console.log(this.token);
      }
    );
  }

  register(user:any ):void
  {
    this.http.post("/api/authentication/register", user,{responseType: "text"}).subscribe(
      resp=>
      {
        console.log(resp)
      }
    )
  }

}
