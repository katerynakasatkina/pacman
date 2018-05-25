import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { LabyrinthComponent } from './labyrinth/labyrinth.component';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { DllComponentComponent } from './dll-component/dll-component.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'start' },
  { path: 'start', component: StartComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'labyrinth', component: LabyrinthComponent },
  { path:'dll',component:DllComponentComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
