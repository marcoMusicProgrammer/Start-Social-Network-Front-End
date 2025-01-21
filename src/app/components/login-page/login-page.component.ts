import { Component } from '@angular/core';
import { UserDTOLoginReq } from "../../models/UserDTOLoginReq"
import { RequestClientService} from '../../services/request-client.service';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CredentialService} from "../../services/./credential.service";
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from '../../models/LoginResponse';
import {ErrorResponse} from '../../models/ErrorResponse';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private serv:CredentialService, private http:HttpClient) { }

  userLogin: UserDTOLoginReq  = {username: '', password: ''};

  loginResponse: LoginResponse = {token:''};
  errorMessage= '';
  // login() {
  //   this.servizioCredenziali.login(this.userLogin);
  // }

  login(){
    this.serv.loginUser(this.userLogin).subscribe({
      next: (response: LoginResponse) => {
        console.log("ciao");
        this.serv.token = response.token;
        console.log(this.serv.token);
        this.errorMessage = '';
      },
      error: (err: ErrorResponse) => {
        console.log(err);
        this.errorMessage = err.message;
      }
      }
    )
  }

}
