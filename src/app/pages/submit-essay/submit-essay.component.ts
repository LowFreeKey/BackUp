import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IcHelloService } from 'src/app/ic-hello.service';
import { Essay } from 'src/app/interface/essay';

@Component({
  selector: 'app-submit-essay',
  templateUrl: './submit-essay.component.html',
  styleUrls: ['./submit-essay.component.scss']
})
export class SubmitEssayComponent implements OnInit {

  constructor(private router:Router, private route: ActivatedRoute, private helloService: IcHelloService) { }
  public response:any;
  public userId!:any;
  public EssayObj!:Essay;
  ngOnInit(): void {
    
  }
  changeRoute(){
    this.router.navigate(['../my-profile'], { relativeTo: this.route });
  }
  changeRouteSkyboard(){
    this.userId = this.helloService.userId;
    this.EssayObj = {
      title : 'string',
      topic : 'string',
      wordCount : 9,
      text : 'string',
      tokenToPay : 3,
      reviewTimes : 4,
    };

    this.response = this.helloService.createEssay(this.EssayObj);
    console.log(this.response);
    // this.router.navigate(['../skyboard'], { relativeTo: this.route });
  }
  changeRouteEssayReview(){
    this.router.navigate(['../essay-review'], { relativeTo: this.route });
  }
  changeRouteMyWork(){
    this.router.navigate(['../my-work'], { relativeTo: this.route });
  }
  
 

  

}
