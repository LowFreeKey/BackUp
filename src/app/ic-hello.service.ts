import { Injectable } from '@angular/core';
import { Essay } from './interface/essay';
import { User } from './interface/user';
const ic_hello = require('src/declarations/hello').hello;



@Injectable({
  providedIn: 'root'
})
export class IcHelloService {
  public userId!:any;

  constructor() { }
  public async createEssay(essay:Essay){
    return await ic_hello.createEssay(essay);
  }
  public async getAllEssay(){
    return await ic_hello.getAllEssays();
  }
  public async getEssay(id:number){
    return await ic_hello.getEssay(id);
  }
  public async createProfile( userData:User){
      return await ic_hello.createProfile( userData);
  }
  public async getUsers(){
    return await ic_hello.getUserEntrybyPrincipal();
  }

  public async getUserId(){
    return await ic_hello.whoami();
  }
  public async getEssaysFromUser(){
    return await ic_hello.getEssaysFromUser();
  }
  public async AddReviewEssay(id:number){
    return await ic_hello.addReviewingEssay(id);
  }
  public async getReviewingEssay(){
    return await ic_hello.getReviewingEssay();
  }
  public async getReviewedEssay(id:number){
    return await ic_hello.getReviewsFromEssay(id);
  }

  public async submitReviewedEssay(text:string){
    return await ic_hello.submittReviewedEssay(text);
  } 
}
