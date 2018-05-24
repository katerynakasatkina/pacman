import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { Hero } from '../models/hero';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  public startGame(heroName: string): void 
  {
    this.gameService.addHero(heroName);
    this.router.navigate(['/labyrinth']);
  }
}
