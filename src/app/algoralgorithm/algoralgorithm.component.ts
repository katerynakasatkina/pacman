import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-algoralgorithm',
  templateUrl: './algoralgorithm.component.html',
  styleUrls: ['./algoralgorithm.component.css']
})
export class AlgoralgorithmComponent {
 
  constructor(
      private gameService: GameService,
      private router: Router
  ) { }

  @ViewChild("fileInput") fileInput;

  public addFile(): void {
      let fi = this.fileInput.nativeElement;
      if (fi.files && fi.files[0]) {
          let fileToUpload = fi.files[0];
          this.gameService
              .upload(fileToUpload)
              .subscribe(res => {
                  console.log(res);
              });
      }
  }

  public playGameWithUserField(): void {
      this.gameService.initTransferList();
      this.router.navigate(['./labyrinth']);
  }
}
