import { Component } from '@angular/core';
import {UserDTOReq} from '../../models/UserDTOReq';
import {RequestClientService} from '../../services/request-client.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {CredentialService} from '../../services/./credential.service';
import {HttpClient} from '@angular/common/http';
import {LoginResponse} from '../../models/LoginResponse';
import {ErrorResponse} from '../../models/ErrorResponse';
import {SignInResponse} from '../../models/SignInResponse';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signin-page',
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './signin-page.component.html',
  standalone: true,
  styleUrl: './signin-page.component.css'
})
export class SigninPageComponent {
  userSignIn: UserDTOReq = {username:"",password:"",email:"",steamId:"",dateOfBirth:new Date()}
  errorMessage= '';
  success = '';

  constructor(private serv:CredentialService, private http:HttpClient) {}

  signIn(){
    this.serv.signInUser(this.userSignIn).subscribe({
        next: (response: SignInResponse) => {
          this.success = response.message;
          this.errorMessage = ' ';
          this.userSignIn = {username:"",password:"",email:"",steamId:"",dateOfBirth:new Date()}
        },
        error: (err: ErrorResponse) => {
          console.log(err);
          this.errorMessage = err.message;
        }
      }
    )
  }
}
