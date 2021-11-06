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
      title : '',
      topic : '',
      wordCount : 0,
      text : '',
      tokenToPay : 0,
      reviewTimes : 0,
    };
  }
  changeRoute(): void{
    this.router.navigate(['../my-profile'], { relativeTo: this.route });
  }  
  async changeRouteSkyboard(){
    this.router.navigate(['../skyboard'], { relativeTo: this.route });
  }
  async Submit(essayForm: { valid: any; }){
    if (essayForm.valid) {      
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
    else {
            console.error('Stock form is in an invalid state');   
     } 
   
  }
  changeRouteEssayReview(){
    this.router.navigate(['../essay-review'], { relativeTo: this.route });
  }
  changeRouteMyWork(){
    this.router.navigate(['../my-work'], { relativeTo: this.route });
  }
  
 

  

}
