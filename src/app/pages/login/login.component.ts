import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IcHelloService } from 'src/app/ic-hello.service';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private route: ActivatedRoute, private helloService:IcHelloService) { }
  public userEntry!:User;
  public rensponse!:any;
  ngOnInit(): void {
  }
  

  changeRoute(){
    // this.userEntry = new  User("itachi",4,[9],5,[4]);
    this.userEntry = {
      userName : "itachi",
      token : 4,
      myEssays : [9],
      userRating : 5,
      reviewingEssay : 4
    }
    this.rensponse = this.helloService.createProfile(this.userEntry);
    console.log(this.rensponse);
    this.rensponse = this.helloService.getUsers();
    this.helloService.userId = this.rensponse;
    console.log(this.rensponse);

    this.router.navigate(['../submit-essay'], { relativeTo: this.route });
  }
  

}
