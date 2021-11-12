import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IcHelloService } from 'src/app/ic-hello.service';
import { User } from 'src/app/interface/user';
const ic_hello = require('src/declarations/hello').hello;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private route: ActivatedRoute, private helloService:IcHelloService) { }
  public userEntry!:User;
  public rensponse!:any;
  public users!:any;
  ngOnInit(): void {
    this.userEntry = {
      userName : "",
      token : 20,
      myEssays : [],
      pastRatedFeedbacks : [],
      userRating : 0,
      reviewingEssay : 0
    }
  }
  

  async changeRoute(){
    // this.userEntry = new  User("itachi",4,[9],5,[4]);
    this.router.navigate(['../submit-essay'], { relativeTo: this.route });
    console.log(this.userEntry);
    this.rensponse = await this.helloService.createProfile(this.userEntry);
    console.log(this.rensponse);
    this.rensponse = await  this.helloService.getUserId();
    console.log(this.rensponse);
    console.log(this.rensponse.toString());
    this.users = await this.helloService.getUsers();
    this.helloService.userId = this.rensponse;
    console.log(this.users);

    
  }
  

}
