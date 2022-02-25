import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor(private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  changeRouteSubmitEssay(): void{
    this.router.navigate(['../submit-essay'], { relativeTo: this.route });
  }  
  async changeRouteSkyboard(){
    this.router.navigate(['../skyboard'], { relativeTo: this.route });
  }
  changeRouteMyWork(){
    this.router.navigate(['../my-work'], { relativeTo: this.route });
  }
}
