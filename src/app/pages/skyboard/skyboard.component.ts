import { Component, OnInit } from '@angular/core';
import { IcHelloService } from 'src/app/ic-hello.service';
import { Essay } from 'src/app/interface/essay';
import { EssayReviewComponent } from '../essay-review/essay-review.component';
//@ts-ignore
import { Recogito } from '@recogito/recogito-js';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-skyboard',
  templateUrl: './skyboard.component.html',
  styleUrls: ['./skyboard.component.scss']
})
export class SkyboardComponent implements OnInit {
  public essays!:Array<Array<Essay>>;
  constructor(private helloService: IcHelloService, private router:Router,private route:ActivatedRoute) {
    
   }

  async ngOnInit(): Promise<void> {
    this.essays = await this.helloService.getAllEssay();
    this.essays.forEach(essay => {
      console.log(essay[1].title);
    });
    console.log(this.essays);
  }
  changeRoute(){
    this.router.navigate(['../my-profile'], { relativeTo: this.route });
  }
  async changeRouteSubmit(){
   
    this.essays = await this.helloService.getEssay(4);
    console.log(this.essays);
    this.router.navigate(['../submit-essay'], { relativeTo: this.route });
  }
  changeRouteReviewBoard(){
    this.router.navigate(['../my-work'], { relativeTo: this.route })
  }
  changeRouteEssayReview(essay:any){
    this.router.navigate(['../essay-review',essay[0],essay[1].text], { relativeTo: this.route });
  }
  changeRouteMyWork(){
    this.router.navigate(['../my-work'], { relativeTo: this.route });
  }
  

}
