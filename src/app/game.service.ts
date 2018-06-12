import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './models/hero';
import { Cell } from './models/cell';
import { User } from './models/user';
import { TransferList } from './models/transferList';

@Injectable({ providedIn: 'root' })
export class GameService {

  private host: string = 'https://bestpackman.azurewebsites.net';
  //private host: string = 'http://localhost:42147';
  private heroesUrl = `${this.host}/api/hero`;
  private labyrintUrl = `${this.host}/api/labyrinth`;
  private fileUploadUrl=`${this.host}/api/UserMap`;
  private currentGamer: string = '';
 // public transferlist: TransferList=null;
  public isUserField:boolean=false;


  constructor(private http: HttpClient) { }

  public getTransferList(): Observable<TransferList>{
    return this.http.get<TransferList>(this.fileUploadUrl);
  }
  
  public upload(fileToUpload: any): Observable<Object> {
    let input = new FormData();
    input.append("file", fileToUpload);
    return this.http.post(this.fileUploadUrl, input);
  }

  public registerUser(user: User): Observable<Object> {
    var data = "UserName=" + encodeURIComponent(user.UserName)
      + "&Password=" + encodeURIComponent(user.Password)
      + "&Email=" + encodeURIComponent(user.Email)
      + "&FirstName=" + encodeURIComponent(user.FirstName)
      + "&LastName=" + encodeURIComponent(user.LastName);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.host + '/api/Account', data, { headers: reqHeader });
  }

  public userAuthentication(userName, password): Observable<Object> {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.host + '/token', data, { headers: reqHeader });
  }

  public getUserClaims(): Observable<Object> {
    return this.http.get(this.host + '/api/GetUserClaims');
  }

  /** GET heroes from the server */
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  /** POST new hero to the server */
  public saveHero(points: number): Observable<Hero> {
    let newHero: Hero = new Hero(localStorage.getItem('userName'), points);

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