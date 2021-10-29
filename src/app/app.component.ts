import { Component } from "@angular/core";
import { Principal } from "@dfinity/principal";
import { IcHelloService } from "./ic-hello.service";
import { Essay } from "./interface/essay";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private helloService: IcHelloService){
    this.getResponse();
  }
  public response:any;
  public userId = this.helloService.getUserId();
  public EssayObj:Essay = {
    title : "string",
    topic : "string",
    wordCount : 9,
    userId : this.userId,
    text : "string",
    tokenToPay : 3,
    reviewTimes : 4,
  };
 

  public async getResponse(){
    this.response = await this.helloService.createEssay(this.EssayObj);
  }
}
