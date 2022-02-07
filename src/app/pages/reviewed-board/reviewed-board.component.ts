import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DiffResults } from '../../../../projects/ngx-text-diff/src/lib/ngx-text-diff.model';
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
  // public myElement!: HTMLElement;
  // public myElement!: HTMLElement;
  @ViewChild("editorArea")
  myElement!: ElementRef;
  
  public  rensponse!:any;
  constructor(private helloService:IcHelloService,) {
  }

  async ngOnInit() {
    this.rensponse = await this.helloService.getReviewingEssay();
    console.log(this.rensponse);
    this.left = this.rensponse[0].text;
    console.log(this.left);
    this.myElement.nativeElement.innerHTML = this.left;
    this.rensponse = await this.helloService.getReviewedEssay(1);
    console.log(this.rensponse);
    this.right = this.rensponse;
    console.log(this.right)
    this.state = true;
    
  }


  onCompareResults(diffResults: DiffResults) {
    console.log('diffResults', diffResults);
  }
  

}
