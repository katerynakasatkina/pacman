import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { LabyrinthComponent } from './labyrinth/labyrinth.component';
import { AppRoutingModule } from './/app-routing.module';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    LabyrinthComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
