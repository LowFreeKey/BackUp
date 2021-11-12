import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IcHelloService } from 'src/app/ic-hello.service';
import { Essay } from 'src/app/interface/essay';

@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.scss']
})
export class MyWorkComponent implements OnInit {
  public essays!:Array<Array<Essay>>;
  public user!:any;
  constructor(private helloService: IcHelloService, private router:Router,private route:ActivatedRoute) {
    
   }

  async ngOnInit(): Promise<void> {
    this.essays = await this.helloService.getAllEssay();
    this.user = await this.helloService.getUsers();
    console.log(this.user);
    console.log(this.user[0].myEssays);
    this.essays.forEach(essay => {
      console.log(essay[1].title);
    });
    console.log(this.essays);
  }
  changeRouteSkyboard(){
    this.router.navigate(['../skyboard'], { relativeTo: this.route });
  }
  changeRoute(){
    this.router.navigate(['../my-profile'], { relativeTo: this.route });
  }
  async changeRouteSubmit(){
   
    this.essays = await this.helloService.getEssay(4);
    console.log(this.essays);
    this.router.navigate(['../submit-essay'], { relativeTo: this.route });
  }

  changeRouteReviewBoard(essay:any){
    this.router.navigate(['../review-board',essay[0],essay[1].text], { relativeTo: this.route });
  }
  changeRouteMyWork(){
    this.router.navigate(['../my-work'], { relativeTo: this.route });
  }
  
}
