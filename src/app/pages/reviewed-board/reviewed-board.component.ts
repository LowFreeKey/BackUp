import { Component, OnInit } from '@angular/core';
import { DiffContent, DiffResults } from 'ngx-text-diff/lib/ngx-text-diff.model';

@Component({
  selector: 'app-reviewed-board',
  templateUrl: './reviewed-board.component.html',
  styleUrls: ['./reviewed-board.component.scss']
})
export class ReviewedBoardComponent implements OnInit {
  left = `some text to\nbe compared!`
  right = `A changed\n version \n of the text to\nbe compared!`

  constructor() {}

  ngOnInit() {
  }

  onCompareResults(diffResults: DiffResults) {
    console.log('diffResults', diffResults);
  }
  

}
