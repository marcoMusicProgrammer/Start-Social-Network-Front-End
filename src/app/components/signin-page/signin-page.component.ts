import { Component } from '@angular/core';
import {UserDTOReq} from '../../models/UserDTOReq';
import {RequestClientService} from '../../services/request-client.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {CredentialServiceService} from '../../services/credential-service.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-signin-page',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './signin-page.component.html',
  standalone: true,
  styleUrl: './signin-page.component.css'
})
export class SigninPageComponent {
  userSignIn: UserDTOReq = {username:"",password:"",email:"",steamId:"",dateOfBirth:new Date()}

  constructor(private servizioCredenziali:CredentialServiceService,private http:HttpClient) {}


  register(){
    this.servizioCredenziali.register(this.userSignIn);
  }

  // signIn(){
  //   this.serv.signInUser(this.userSignIn).subscribe(
  //     (resp)=>{
  //       this.stringa = resp;
  //       console.log(this.stringa);
  //     }
  //   )
  // }
}
