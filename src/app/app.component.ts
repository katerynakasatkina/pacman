import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) { }

  public isLoggedIn(): boolean {
    if (localStorage.getItem('userToken') != null) {
      return true;
    } else {
      return false;
    }
  }

  public Logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
