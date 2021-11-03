import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IcHelloService } from 'src/app/ic-hello.service';

@Component({
  selector: 'app-essay-review',
  templateUrl: './essay-review.component.html',
  styleUrls: ['./essay-review.component.scss']
})
export class EssayReviewComponent implements OnInit {
  public essay!:any;
  public  rensponse!:any;
  public text:string = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt cum mollitia a magni consectetur quos odio recusandae autem, laborum quasi error exercitationem aliquid deserunt cumque id nisi obcaecati neque assumenda expedita corrupti fugiat, sunt facere. Recusandae, sed? Ea ducimus repudiandae minus nihil numquam necessitatibus hic, vel aut, expedita officia voluptas?"
  public id: any;
  constructor(private helloService:IcHelloService, private router:Router, private route:ActivatedRoute) { 

  }
  

  async submitEssay(){
    // this.userId = this.helloService.userId;
    // this.response =  await this.helloService.createEssay(this.EssayObj);
    // console.log(this.response);
    // this.essays = await this.helloService.getAllEssay();
    // console.log(this.essays);
    this.rensponse = await this.helloService.submitReviewedEssay(this.text);
    console.log(this.rensponse);
    this.rensponse = await this.helloService.getReviewedEssay(0);
    console.log(this.rensponse);
    // this.router.navigate(['../skyboard'], { relativeTo: this.route });
  }

  async ngOnInit(): Promise<void> {

     this.id = this.route.snapshot.paramMap.get('id');
     if (this.id){
       this.id = parseInt(this.id)
     }
     this.rensponse = await this.helloService.AddReviewEssay(this.id);
     console.log(this.rensponse);
     this.rensponse = await this.helloService.getReviewingEssay();
     console.log(this.rensponse);
    this.essay = this.route.snapshot.paramMap.get('essay');
    if(this.essay){
      this.text = this.essay;
    }
    console.log(this.essay);
    console.log(this.id);
    
  }
  changeRouteSkyboard(){
    this.router.navigate(['../../../skyboard'], { relativeTo: this.route });
  }
  changeRouteMyWork(){
    this.router.navigate(['../../../my-work'], { relativeTo: this.route });
  }
  changeRouteEssaySubmit(){
    this.router.navigate(['../../../submit-essay'], { relativeTo: this.route });
  }
  
  
}
