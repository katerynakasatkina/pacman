import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero'
import { GameService } from '../game.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: Hero[];

  constructor(private gameService: GameService) { }

  public ngOnInit(): void
  {
    this.getHeroes();
  }

  private getHeroes(): void
  {
    this.gameService.getHeroes()
    .subscribe(
      (data:Hero[])=>this.heroes=data,
      (err:any)=>console.log(err),
      ()=>console.log('All done getting heroes')
    );
  }
}
