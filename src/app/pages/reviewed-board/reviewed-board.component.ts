import { Component, OnInit } from '@angular/core';
import { DiffContent, DiffResults } from 'ngx-text-diff/lib/ngx-text-diff.model';
import { IcHelloService } from 'src/app/ic-hello.service';

@Component({
  selector: 'app-reviewed-board',
  templateUrl: './reviewed-board.component.html',
  styleUrls: ['./reviewed-board.component.scss']
})
export class ReviewedBoardComponent implements OnInit {
  left!:string;
  right!:string;
  state:boolean = false;
  
  public  rensponse!:any;
  constructor(private helloService:IcHelloService,) {
  }

  async ngOnInit() {
    this.rensponse = await this.helloService.getReviewingEssay();
    console.log(this.rensponse);
    this.left = this.rensponse[0].text;
    console.log(this.left);
    this.rensponse = await this.helloService.getReviewedEssay(0);
    this.right = this.rensponse;
    console.log(this.right)
    this.state = true;
    
  }


  onCompareResults(diffResults: DiffResults) {
    console.log('diffResults', diffResults);
  }
  

}
