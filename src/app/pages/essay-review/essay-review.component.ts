import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IcHelloService } from 'src/app/ic-hello.service';
import Quill from 'quill';
//@ts-ignore
import * as Comment from 'quill-comment';

Quill.register("modules/comment", Comment);

Quill.register("modules/handlers", Comment);



@Component({
  selector: 'app-essay-review',
  templateUrl: './essay-review.component.html',
  styleUrls: ['./essay-review.component.scss']
})
export class EssayReviewComponent implements OnInit {
  public essay!:any;
  public  rensponse!:any;
  public text:string = ""
  public id: any;
  modules = {}
  content = ''
  matContent = ''
  toolbarOptions = [
    ['comments-toggle'], // comment color on/off
    ['comments-add'] // comment add
];
  constructor(private helloService:IcHelloService, private router:Router, private route:ActivatedRoute) { 
    this.modules = {
      toolbar: this.toolbarOptions,	
      handlers: {
        'omega': () => { console.log('omega is clicked'); }
      },
      // comment setting
      comment: {
          enabled: true,
          commentAuthorId: 123,
          commentAddOn: 'Author Name', // any additional info needed
          color: 'yellow', // comment background color in the text
          commentAddClick: this.commentAddClick, // get called when `ADD COMMENT` btn on options bar is clicked
          commentsClick: this.commentsClick, // get called when you click `COMMENTS` btn on options bar for you to do additional things beside color on/off. Color on/off is already done before the callback is called.
          commentTimestamp: this.commentServerTimestamp,
      },
    }
  }
  

  async submitEssay(){
    // this.userId = this.helloService.userId;
    // this.response =  await this.helloService.createEssay(this.EssayObj);
    // console.log(this.response);
    // this.essays = await this.helloService.getAllEssay();
    // console.log(this.essays);
    this.rensponse = await this.helloService.submitReviewedEssay(this.text);
    console.log(this.rensponse);
    this.rensponse = await this.helloService.getReviewedEssay(1);
    console.log(this.rensponse);
    this.router.navigate(['../../../skyboard'], { relativeTo: this.route });
  }

  async ngOnInit(): Promise<void> {

     this.id = this.route.snapshot.paramMap.get('id');
     if (this.id){
       this.id = parseInt(this.id)
     }
     this.rensponse = await this.helloService.AddReviewEssay(this.id);
     console.log(this.rensponse);
     this.rensponse = await this.helloService.getReviewingEssay();
     console.log(this.rensponse);
    this.essay = this.route.snapshot.paramMap.get('essay');
    if(this.essay){
      this.text = this.essay;
    }
    console.log(this.essay);
    console.log(this.id);
    
  }
  changeRouteSkyboard(){
    this.router.navigate(['../../../skyboard'], { relativeTo: this.route });
  }
  changeRouteMyWork(){
    this.router.navigate(['../../../my-work'], { relativeTo: this.route });
  }
  changeRouteEssaySubmit(){
    this.router.navigate(['../../../submit-essay'], { relativeTo: this.route });
  }
 
// editorModule = {
//   toolbar: this.toolbarOptions,	
//   handlers: {
//     'omega': () => { console.log('omega is clicked'); }
//    },
//       // comment setting
//       comment: {
//           enabled: true,
//           commentAuthorId: 123,
//           commentAddOn: 'Author Name', // any additional info needed
//           color: 'yellow', // comment background color in the text
//           commentAddClick: this.commentAddClick, // get called when `ADD COMMENT` btn on options bar is clicked
//           commentsClick: this.commentsClick, // get called when you click `COMMENTS` btn on options bar for you to do additional things beside color on/off. Color on/off is already done before the callback is called.
//           commentTimestamp: this.commentServerTimestamp,
//       },
     
// }
commentsClick(dee:any) {
  // comments btn callback
}
 commentAddClick() {
  // UX works to get comment from user, like showing modal dialog
  // $('#inputCommentModal').modal('show');
  // But after whatever UX works, call the `callback` with comment to pass back comment
  // callback will be null when nth is selected
  this.commentsClick(Comment);
}

 commentServerTimestamp() {

  // call from server or local time. But must return promise with UNIX Epoch timestamp resolved (like 1507617041)
  return new Promise((resolve, reject) => {
      const currentTimestamp = Math.round((new Date()).getTime() / 1000);

      resolve(currentTimestamp); 
  });
}


  
}
