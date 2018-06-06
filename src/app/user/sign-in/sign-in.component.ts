import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  isLoginError : boolean = false;

  constructor(
    private gameService : GameService,
    private router : Router
  ) { }

  OnSubmit(userName,password){
   // this.gameService.addHero();
    this.gameService.userAuthentication(userName,password).subscribe((data : any)=>{
     localStorage.setItem('userToken', data.access_token);
     localStorage.setItem('userName',userName);
     this.router.navigate(['/algorithm']);
   },
   (err : HttpErrorResponse)=>{
     this.isLoginError = true;
   });
 }

}
