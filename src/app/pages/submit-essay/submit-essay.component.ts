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
  public essays!:any;
  public essay!:any;
  ngOnInit(): void {
    this.EssayObj = {
      title : 'string',
      topic : 'rin',
      wordCount : 9,
      text : 'ring',
      tokenToPay : 3,
      reviewTimes : 4,
    };
  }
  changeRoute(){
    this.router.navigate(['../my-profile'], { relativeTo: this.route });
  }
  async changeRouteSkyboard(){
    console.log(this.EssayObj);
    this.userId = this.helloService.userId;
    this.response =  await this.helloService.createEssay(this.EssayObj);
    console.log(this.response);
    this.essays = await this.helloService.getAllEssay();
    console.log(this.essays);
    this.essay = await this.helloService.getEssay(4);
    console.log(this.essay);
    this.router.navigate(['../skyboard'], { relativeTo: this.route });
  }
  changeRouteEssayReview(){
    this.router.navigate(['../essay-review'], { relativeTo: this.route });
  }
  changeRouteMyWork(){
    this.router.navigate(['../my-work'], { relativeTo: this.route });
  }
  
 

  

}
