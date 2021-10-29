import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-submit-essay',
  templateUrl: './submit-essay.component.html',
  styleUrls: ['./submit-essay.component.scss']
})
export class SubmitEssayComponent implements OnInit {

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  changeRoute(){
    this.router.navigate(['../my-profile'], { relativeTo: this.route });
  }
  changeRouteSkyboard(){
    this.router.navigate(['../skyboard'], { relativeTo: this.route });
  }
  changeRouteEssayReview(){
    this.router.navigate(['../essay-review'], { relativeTo: this.route });
  }
  changeRouteMyWork(){
    this.router.navigate(['../my-work'], { relativeTo: this.route });
  }

}
