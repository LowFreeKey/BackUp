import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EssayReviewComponent } from './pages/essay-review/essay-review.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MyWorkComponent } from './pages/my-work/my-work.component';
import { ReviewedBoardComponent } from './pages/reviewed-board/reviewed-board.component';
import { SkyboardComponent } from './pages/skyboard/skyboard.component';
import { SubmitEssayComponent } from './pages/submit-essay/submit-essay.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'submit-essay' , component: SubmitEssayComponent},
  {path: 'skyboard', component: SkyboardComponent},
  {path: 'review-board/:id/:essay', component: ReviewedBoardComponent},
  {path: 'my-work', component: MyWorkComponent},
  {path:'my-profile', component:MyProfileComponent},
  {path:'login', component:LoginComponent},
  {path:'essay-review/:id/:essay', component:EssayReviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
