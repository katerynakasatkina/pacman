import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GameService } from '../../game.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isRegistered: boolean = false;
  user: User;
 
  constructor(
    private userService: GameService,
    private toastr: ToastrService,
    private router : Router
  ) { }
 
  public ngOnInit(): void {
    this.resetForm();
  }
 
  protected resetForm(form?: NgForm): void {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
  }
 
  public OnSubmit(form: NgForm): void {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
          this.isRegistered=true;
          this.userService.isNewUser=true;
          this.router.navigate(['/emailConfirmation']);
        }
      });
  }
 
}