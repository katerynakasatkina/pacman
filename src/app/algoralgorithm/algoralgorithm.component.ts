import { Component } from '@angular/core';
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

    public uploadField(files: FileList): void {
        let fileToUpload: File = files.item(0);

        this.gameService.upload(fileToUpload)
            .subscribe(res => {
                console.log(res);
            }, error => {
                console.log(error);
            });
    }

    public playGameWithUserField(): void {
        this.gameService.isUserField = true;
        this.router.navigate(['./labyrinth']);
    }
}
