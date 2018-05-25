import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dll-component',
  templateUrl: './dll-component.component.html',
  styleUrls: ['./dll-component.component.css']
})
export class DllComponentComponent implements OnInit {

  fileToUpload: File = null;

  constructor() { }

  ngOnInit() {
  }

}
