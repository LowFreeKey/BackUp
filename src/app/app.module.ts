import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTextDiffModule } from 'ngx-text-diff';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SubmitEssayComponent } from './pages/submit-essay/submit-essay.component';
import { SkyboardComponent } from './pages/skyboard/skyboard.component';
import { EssayReviewComponent } from './pages/essay-review/essay-review.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MyWorkComponent } from './pages/my-work/my-work.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { ReviewedBoardComponent } from './pages/reviewed-board/reviewed-board.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubmitEssayComponent,
    SkyboardComponent,
    EssayReviewComponent,
    MyProfileComponent,
    MyWorkComponent,
    HomePageComponent,
    ReviewedBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    QuillModule,
    AppRoutingModule,
    ScrollingModule, 
    NgxTextDiffModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
