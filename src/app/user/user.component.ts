import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public EmailVerified:boolean=false;
  public isNewUser:boolean=false;

  constructor(
    private gameService: GameService,
    private router : Router
  ) { }

  ngOnInit(): void {
   this.EmailVerified=this.gameService.isEmailVerified;
   this.isNewUser=this.gameService.isNewUser;
  }
}
