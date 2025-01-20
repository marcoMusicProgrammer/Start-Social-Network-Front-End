import { Component } from '@angular/core';
import {UserDTOReq} from '../../models/UserDTOReq';
import {RequestClientService} from '../../services/request-client.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

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
  userSignIn: UserDTOReq = {id:0,username:"",password:"",email:"",steamId:"",dateOfBirth:new Date()}

  constructor(private serv: RequestClientService) {
  }

  signIn(){
    this.serv.signInUser(this.userSignIn).subscribe(
      (resp)=>{
        console.log(resp);
      }
    )
  }
}
