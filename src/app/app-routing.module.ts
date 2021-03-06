import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { LabyrinthComponent } from './labyrinth/labyrinth.component';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { AlgoralgorithmComponent } from './algoralgorithm/algoralgorithm.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'algorithm' },
  { path: 'emailConfirmation', component: EmailConfirmationComponent},
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard]  },
  { path: 'labyrinth', component: LabyrinthComponent, canActivate: [AuthGuard]  },
  { path: 'algorithm', component: AlgoralgorithmComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: UserComponent, children: [{ path: '', component: SignUpComponent }] },
  { path: 'login', component: UserComponent, children: [{ path: '', component: SignInComponent }] }
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(routes)],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
