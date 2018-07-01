import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './models/hero';
import { Cell } from './models/cell';
import { User } from './models/user';
import { TransferList } from './models/transferList';
import { EmailCode } from './models/emaiCode';

@Injectable({ providedIn: 'root' })
export class GameService {
 // private host: string = 'http://localhost:42147';
  private host:string='https://mypacman.azurewebsites.net';

  private heroesUrl = `${this.host}/api/hero`;
  private fileUploadUrl = `${this.host}/api/UserMap`;
  private labyrintUrl = `${this.host}/api/labyrinth`;
  public isUserField: boolean = false;
  public userFieldName: string;
  public isEmailVerified:boolean=false;
  public isNewUser:boolean=false;

  constructor(private http: HttpClient) { }

  public getTransferList(): Observable<TransferList> {
    return this.http.get<TransferList>(`${this.fileUploadUrl}?fieldDll=${this.userFieldName}`);
  }

  public upload(fileToUpload: File): Observable<Object> {
    this.userFieldName = fileToUpload.name;

    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);

    return this.http.post(this.fileUploadUrl, formData);
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
    return this.http.get(this.host + '/api/Account');
  }

  /** GET heroes from the server */
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  public getEmailCode(code:string):Observable<EmailCode>{
    var reqHeader = new HttpHeaders({'No-Auth': 'True' });
    return this.http.get<EmailCode>(this.host+'/api/Email?code='+code,{ headers: reqHeader });
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