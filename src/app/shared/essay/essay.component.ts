import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-essay',
  templateUrl: './essay.component.html',
  styleUrls: ['./essay.component.scss']
})
export class EssayComponent implements OnInit {
  public title!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
