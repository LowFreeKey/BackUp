import { R3TargetBinder } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public editorForm!: FormGroup;
  public editorStyle ={
    height: '300px;',
    backgroundColor: '#000;'
  }

 public response!:any;
  ngOnInit(): void {
  this.editorForm = new FormGroup({
    'editor': new FormControl(null)
  })
    
  }
   onSubmit(){
    console.log(this.editorForm.get('editor'))
  } 
}



