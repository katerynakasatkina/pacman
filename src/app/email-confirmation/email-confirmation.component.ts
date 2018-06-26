import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailCode } from '../models/emaiCode';
import { Observable } from 'rxjs';

@Component({
  // selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  public isEmailConfirmed: boolean = false;
  public emailCode: EmailCode;
  public  code: string="";

  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.code= this.activatedRoute.snapshot.params['code'];
    this.gameService.getEmailCode(this.code)
      .subscribe(
        (emailCode: EmailCode) => 
          this.emailCode = emailCode,
          (err:any)=>console.log(err),
          ()=>console.log('All done getting EmailCode'));
  }
}
