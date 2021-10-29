import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SubmitEssayComponent } from './pages/submit-essay/submit-essay.component';
import { SkyboardComponent } from './pages/skyboard/skyboard.component';
import { EssayReviewComponent } from './pages/essay-review/essay-review.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MyWorkComponent } from './pages/my-work/my-work.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubmitEssayComponent,
    SkyboardComponent,
    EssayReviewComponent,
    MyProfileComponent,
    MyWorkComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
