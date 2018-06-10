import { Component, OnInit, Output, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'
import { Cell } from '../models/cell';
import { GameService } from '../game.service';
import { Hero } from '../models/hero';

@Component({
  //selector: 'app-labyrinth',
  templateUrl: './labyrinth.component.html',
  styleUrls: ['./labyrinth.component.css']
})
export class LabyrinthComponent implements OnInit {

  public list: Cell[][] = new Array();
  public enemies: Cell[] = new Array();
  public pacman: Cell = null;
  public points: number = 0;
  public resultPoints: number = 0;
  public key: string;
  public lives: number = 3;
  public gameTimer: number = 60;

  constructor(private gameService: GameService, private router: Router) { }

  public redirect() {
    this.router.navigate(['./heroes']);
  }

  public ngOnInit(): void {
    this.gameService.getLabyrinth()
      .subscribe(
        (list: Cell[][]) => {
          this.list = list;

          this.setCoordinates();
          this.findPacmanAndEnemiesCells();

          var id = setInterval((function () {
            this.MoveEnemies(id);
          }).bind(this), 700);

          var idTime = setInterval((function () {
            this.gameTimer--;
            if (this.gameTimer === 0 || this.lives <= 0) {
              this.resultPoints = this.points;
              this.stopGame(idTime);
            }
          }).bind(this), 1000);
        }
      );
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    if (this.key === 'ArrowRight') {
      let xOld: number = this.pacman.X;
      let xNew: number = this.pacman.X + 1;
      let isWallOnWay: boolean = false;
      //if wall on way
      if (xNew < 0 || xNew > 19 || this.list[this.pacman.Y][xNew].IsWall === true) {
        isWallOnWay = true;
      }

      if (isWallOnWay === false) {
        //set pacman's cell to free 
        this.list[this.pacman.Y][xOld].IsPacman = false;
        if (this.list[this.pacman.Y][xOld].IsEmpty === false) //apple is here
        {
          this.list[this.pacman.Y][xOld].IsEmpty = true;  //apple was eaten
          this.points++;
        }
        //set next cell-pacman's one, it is not free and not empty yet
        this.list[this.pacman.Y][xNew].IsPacman = true;
        this.IspacmanDead();
        //assign to pacman property new cell
        this.pacman = this.list[this.pacman.Y][xNew];
      }
    }

    if (this.key === 'ArrowLeft') {
      let xOld: number = this.pacman.X;
      let xNew: number = this.pacman.X - 1;
      let isWallOnWay: boolean = false;
      //if wall on way
      if (xNew < 0 || xNew > 19 || this.list[this.pacman.Y][xNew].IsWall === true) {
        isWallOnWay = true;
      }
      //xOld<=9&&xOld>=0&&
      if (isWallOnWay === false) {
        //set pacman's cell to free 
        this.list[this.pacman.Y][xOld].IsPacman = false;
        if (this.list[this.pacman.Y][xOld].IsEmpty === false) //apple is here
        {
          this.list[this.pacman.Y][xOld].IsEmpty = true;  //apple was eaten
          this.points++;
        }
        //set next cell-pacman's one, it is not free and not empty yet
        this.list[this.pacman.Y][xNew].IsPacman = true;
        this.IspacmanDead();
        //assign to pacman property new cell
        this.pacman = this.list[this.pacman.Y][xNew];
      }
    }

    if (this.key === 'ArrowUp') {
      let yOld: number = this.pacman.Y;
      let yNew: number = this.pacman.Y - 1;
      let isWallOnWay: boolean = false;
      //if wall on way
      if (yNew < 0 || yNew > 19 || this.list[yNew][this.pacman.X].IsWall === true) {
        isWallOnWay = true;
      }

      if (isWallOnWay === false) {
        //set pacman's cell to free 
        this.list[yOld][this.pacman.X].IsPacman = false;
        if (this.list[yOld][this.pacman.X].IsEmpty === false) //apple is here
        {
          this.list[yOld][this.pacman.X].IsEmpty = true;  //apple was eaten
          this.points++;
        }
        //set next cell-pacman's one, it is not free and not empty yet
        this.list[yNew][this.pacman.X].IsPacman = true;
        this.IspacmanDead();
        //assign to pacman property new cell
        this.pacman = this.list[yNew][this.pacman.X];
      }
    }

    if (this.key === 'ArrowDown') {
      let yOld: number = this.pacman.Y;
      let yNew: number = this.pacman.Y + 1;
      let isWallOnWay: boolean = false;
      //if wall on way
      if (yNew < 0 || yNew > 19 || this.list[yNew][this.pacman.X].IsWall === true) {
        isWallOnWay = true;
      }

      if (isWallOnWay === false) {
        //set pacman's cell to free 
        this.list[yOld][this.pacman.X].IsPacman = false;
        if (this.list[yOld][this.pacman.X].IsEmpty === false) //apple is here
        {
          this.list[yOld][this.pacman.X].IsEmpty = true;  //apple was eaten
          this.points++;
        }
        //set next cell-pacman's one, it is not free and not empty yet
        this.list[yNew][this.pacman.X].IsPacman = true;
        this.IspacmanDead();
        //assign to pacman property new cell
        this.pacman = this.list[yNew][this.pacman.X];
      }
    }
  }

  private moveEnemyRight(enemy: Cell, index: number) {
    //move right
    let xOld = enemy.X;
    let xNew = enemy.X + 1;
    let isWallOnWay: boolean = false;
    //if wall on way
    if (xNew < 0 || xNew > 19 || this.list[enemy.Y][xNew].IsWall === true) {
      isWallOnWay = true;
    }

    if (isWallOnWay === false) {
      this.list[enemy.Y][xOld].IsEnemy = false;
      this.list[enemy.Y][xNew].IsEnemy = true;
      this.enemies[index] = this.list[enemy.Y][xNew];
    }
  }

  private moveEnemyLeft(enemy: Cell, index: number) {
    //move right
    let xOld = enemy.X;
    let xNew = enemy.X - 1;
    let isWallOnWay: boolean = false;
    //if wall on way
    if (xNew < 0 || xNew > 19 || this.list[enemy.Y][xNew].IsWall === true) {
      isWallOnWay = true;
    }

    if (isWallOnWay === false) {
      this.list[enemy.Y][xOld].IsEnemy = false;
      this.list[enemy.Y][xNew].IsEnemy = true;
      this.enemies[index] = this.list[enemy.Y][xNew];
    }
  }

  private moveEnemyUp(enemy: Cell, index: number) {
    //move right
    let yOld = enemy.Y;
    let yNew = enemy.Y - 1;
    let isWallOnWay: boolean = false;
    //if wall on way
    if (yNew < 0 || yNew > 19 || this.list[yNew][enemy.X].IsWall === true) {
      isWallOnWay = true;
    }

    if (isWallOnWay === false) {
      this.list[yOld][enemy.X].IsEnemy = false;
      this.list[yNew][enemy.X].IsEnemy = true;
      this.enemies[index] = this.list[yNew][enemy.X];
    }
  }

  private moveEnemyDown(enemy: Cell, index: number) {
    //move right
    let yOld = enemy.Y;
    let yNew = enemy.Y + 1;
    let isWallOnWay: boolean = false;
    //if wall on way
    if (yNew < 0 || yNew > 19 || this.list[yNew][enemy.X].IsWall === true) {
      isWallOnWay = true;
    }

    if (isWallOnWay === false) {
      //set enemy cell to free 
      this.list[yOld][enemy.X].IsEnemy = false;
      this.list[yNew][enemy.X].IsEnemy = true;
      this.enemies[index] = this.list[yNew][enemy.X];
    }
  }

  private FindPacmanSquare(enemy: Cell): number {
    let xPacman=this.pacman.X;
    let yPacman=this.pacman.Y;
    let xEnemy=enemy.X;
    let yEnemy=enemy.Y;
    if ((xEnemy<xPacman)&&(yEnemy>yPacman))
      return 1;
    if ((xEnemy>xPacman)&&(yEnemy>yPacman))
      return 2;
    if ((xEnemy>xPacman)&&(yEnemy<yPacman))
      return 3;
    if ((xEnemy<xPacman)&&(yEnemy<yPacman))
      return 4;
    if ((xEnemy<xPacman)&&(yEnemy===yPacman))
      return 5;
    if ((xEnemy===xPacman)&&(yEnemy>yPacman))
      return 6;
    if ((xEnemy>xPacman)&&(yEnemy===yPacman))
      return 7;
    if ((xEnemy===xPacman)&&(yEnemy<yPacman))
      return 8;
  }

  private FindProperWays(pacmanSquare: Number): string[] {
    let properWays: string[] = new Array;
    switch (pacmanSquare) {
      case 1:
        {
          properWays.push("up");
          properWays.push("right");
          break;
        }
      case 2:
        {
          properWays.push("up");
          properWays.push("left");
          break;
        }
      case 3:
        {
          properWays.push("down");
          properWays.push("left");
          break;
        }
      case 4:
        {
          properWays.push("down");
          properWays.push("right");
          break;
        }
      case 5:
        {
          properWays.push("right");
          break;
        }
      case 6:
        {
          properWays.push("up");
          break;
        }
      case 7:
        {
          properWays.push("left");
          break;
        }
      case 8:
        {
          properWays.push("down");
          break;
        }
    }
    return properWays;
  }

  private FindIntersectionOfWays(avaible: string[], proper: string[]): string[] {
    let result: string[] = new Array();

    for (let i = 0; i < proper.length; i++) {
      for (let j = 0; j < avaible.length; j++) {
        if (proper[i] === avaible[j]) {
          result.push(proper[i]);
        }
      }
    }
    if (result.length == 0)
      return avaible;
    return result;
  }

  private MoveEnemies(id: number) {
    let way: string = '';
    let evaibleWays: string[] = new Array();
    let properWays: string[] = new Array();
    let pacmanSquare: number = 0;
    let isOld: boolean = false;
    let resultWays: string[] = new Array();
    let oldDirections: string[] = new Array();
    let wayNumber: number = 0;

    for (let i = 0; i < this.enemies.length; i++) {
      way = '';
      evaibleWays = this.FindEvaibleWaysForEnemy(this.enemies[i]);
      pacmanSquare = this.FindPacmanSquare(this.enemies[i]);
      properWays = this.FindProperWays(pacmanSquare);
      resultWays=this.FindIntersectionOfWays(evaibleWays,properWays);
      //if it's possible to move in old direction
      isOld = this.IsOldWayOk(oldDirections[i],resultWays);
      if (isOld === true)
        way = oldDirections[i];
      else { //else chose random direction
        wayNumber = Math.floor(Math.random() * ((resultWays.length - 1) - 0 + 1)) + 0;
        way = resultWays[wayNumber];
        oldDirections[i] = way;
      }

      //move enemy
      if (way === "right") {
        this.moveEnemyRight(this.enemies[i], i);
      } else if (way === "left") {
        this.moveEnemyLeft(this.enemies[i], i);
      } else if (way === "up") {
        this.moveEnemyUp(this.enemies[i], i);
      } else if (way === "down") {
        this.moveEnemyDown(this.enemies[i], i);
      } else if (way === '')
        console.log(way === "");


      if (this.gameTimer === 0) {
        this.stopGame(id);
      }
    }
    this.IspacmanDead();
  }

  private IsOldWayOk(oldWay: string, ways: string[]): boolean {
    if (oldWay === '')
      return false;
    for (let i = 0; i < ways.length; i++) {
      if (ways[i] === oldWay)
        return true;
    }
    return false;
  }

  private IspacmanDead() {
    let xPacman: number = this.pacman.X;
    let yPacman: number = this.pacman.Y;

    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].X === xPacman && this.enemies[i].Y === yPacman)
        --this.lives;
    }
  }

  private stopGame(id: number) {
    clearInterval(id);
    this.gameService.saveHero(this.resultPoints).subscribe();
  }

  private FindEvaibleWaysForEnemy(enemy: Cell): string[] {
    let result: string[] = new Array();

    let index = enemy.X;
    index++;
    if (index <= 19) {
      if (this.list[enemy.Y][index].IsWall === false)
        result.push("right");
    }

    index = index - 2;
    if (index >= 0) {
      if (this.list[enemy.Y][index].IsWall === false)
        result.push("left");
    }

    index = enemy.Y;
    index++;
    if (index <= 19) {
      if (this.list[index][enemy.X].IsWall === false)
        result.push("down");
    }

    index = index - 2;
    if (index >= 0) {
      if (this.list[index][enemy.X].IsWall === false)
        result.push("up");
    }

    return result;
  }

  private setCoordinates(): void {
    for (let i = 0; i < this.list.length; i++) {
      let row = this.list[i];
      for (let j = 0; j < row.length; j++) {
        let cell = this.list[i][j];
        cell.X = j;
        cell.Y = i;
      }
    }
  }

  private findPacmanAndEnemiesCells(): void {
    for (let i = 0; i < this.list.length; i++) {
      let row = this.list[i];
      for (let j = 0; j < row.length; j++) {
        let cell = this.list[i][j];
        if (cell.IsPacman === true) {
          this.pacman = cell;
        }
        if (cell.IsEnemy) {
          this.enemies.push(cell);
        }
      }
    }
  }
}
