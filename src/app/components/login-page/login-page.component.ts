import { Component } from '@angular/core';
import { UserDTOLoginReq } from "../../models/UserDTOLoginReq"
import { RequestClientService} from '../../services/request-client.service';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CredentialServiceService} from "../../services/credential-service.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private servizioCredenziali:CredentialServiceService,private http:HttpClient) {}

  userLogin: UserDTOLoginReq= {username: '', password: ''};

  login() {
    this.servizioCredenziali.login(this.userLogin);
  }
}
