import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailCode } from '../models/emaiCode';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  public emailCode: EmailCode;
  public code: string = "";

  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute,
    private router: Router) {
      console.log(this.activatedRoute.snapshot.queryParams['code'])
  }

  ngOnInit() {
    this.code = this.activatedRoute.snapshot.queryParams['code'];
    this.gameService.getEmailCode(this.code)
      .subscribe(
        (data: EmailCode) => { this.emailCode = data },
        (err: any) => console.log(err),
        () => console.log('All done getting EmailCode'));
  }
}
