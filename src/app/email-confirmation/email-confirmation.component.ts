import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailCode } from '../models/emaiCode';

@Component({
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  public emailCode: EmailCode;
  public code: string = "";

  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.code = this.activatedRoute.snapshot.queryParams['code'];

    this.gameService.getEmailCode(this.code)
    .subscribe(
        (data: EmailCode) => {
           console.log(data);
           this.emailCode = data;
        },
        (err: any) => console.log(err),
        () => console.log('All done getting EmailCode')
    );
  }
}
