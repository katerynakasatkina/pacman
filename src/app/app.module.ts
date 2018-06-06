import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { LabyrinthComponent } from './labyrinth/labyrinth.component';
import { AppRoutingModule } from './/app-routing.module';
// import { StartComponent } from './start/start.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
/* import { HomeComponent } from './home/home.component'; */
import { GameService } from './game.service';
import { AlgoralgorithmComponent } from './algoralgorithm/algoralgorithm.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    LabyrinthComponent,
    // StartComponent,
    SignUpComponent,
    // HomeComponent,
    UserComponent,
    SignInComponent,
    AlgoralgorithmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    GameService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
