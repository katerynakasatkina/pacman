import { Injectable } from '@angular/core';
import { Hero } from './models/hero';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Cell } from './models/cell';

@Injectable({ providedIn: 'root' })
export class GameService {
  private host: string = 'http://bestpackman.azurewebsites.net'; // http://localhost:30057
  private heroesUrl = `${this.host}/api/heroes`;
  private labyrintUrl = `${this.host}/api/labyrinth`;

  private currentGamer: string = '';

  constructor(private http: HttpClient) { }

  public addHero(gamer: string): void {
    this.currentGamer = gamer;
  }

  /** GET heroes from the server */
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  /** POST new hero to the server */
  public saveHero(points: number): Observable<Hero> {
    let newHero: Hero = new Hero(this.currentGamer, points);

    return this.http.post<Hero>(this.heroesUrl, newHero, {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    })
  }

  /** GET labyrinth from the server */
  public getLabyrinth(): Observable<Cell[][]> {
    return this.http.get(this.labyrintUrl)
      .pipe(
        map((resultResponse: Cell[][]) => {
          return resultResponse;
        })
      );
  }
}