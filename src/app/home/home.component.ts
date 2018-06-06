// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { GameService } from '../game.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   userClaims: any;
 
//   constructor(private router: Router, private userService: GameService) { }
 
//   ngOnInit() {
//     this.userService.getUserClaims().subscribe((data: any) => {
//       this.userClaims = data; 
//     });
//   }
 
//   public Logout(): void {
//     localStorage.removeItem('userToken');
//     this.router.navigate(['/login']);
//   }
// }
