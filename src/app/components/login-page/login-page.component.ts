import { Component } from '@angular/core';
import { UserDTOLoginReq } from "../../models/UserDTOLoginReq"
import { RequestClientService} from '../../services/request-client.service';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
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

  constructor(private serv:CredentialService, private http:HttpClient, private router: Router) { }

  userLogin: UserDTOLoginReq  = {username: '', password: ''};
  loginResponse: LoginResponse = {token:''};
  errorMessage= '';
  tokenSplitted: string[] = [];

  login(){
    this.serv.loginUser(this.userLogin).subscribe({
        next: (response: LoginResponse) => {
          this.serv.token = response.token;
          this.tokenSplitted = this.serv.token.split("-")
          this.errorMessage = '';
          this.router.navigate(['/user-profile',this.tokenSplitted[1]]).then(r => console.log("login effettuato"));
        },
        error: (err: ErrorResponse) => {
          console.log(err);
          this.errorMessage = err.message;
        }
      }
    )
  }

}
