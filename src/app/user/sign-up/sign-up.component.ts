import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GameService } from '../../game.service';
import { User } from '../../models/user';
 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isRegistered:boolean=false;
  user: User;
 // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
 
  constructor(private userService: GameService, private toastr: ToastrService) { }
 
  ngOnInit() {
    this.resetForm();
  }
 
  resetForm(form?: NgForm) {
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
 
  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
          this.isRegistered=true;
         console.log("registration syccessful")
        }
        else
         console.log("registation error")
      });
  }
 
}