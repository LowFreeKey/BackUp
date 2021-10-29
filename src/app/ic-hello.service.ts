import { Injectable } from '@angular/core';
import { Essay } from './interface/essay';
import { User } from './interface/user';
const ic_hello = require('src/declarations/hello').hello;

@Injectable({
  providedIn: 'root'
})
export class IcHelloService {

  constructor() { }
  public async createEssay(essay:Essay){
    return await ic_hello.createEssay(essay);
  }
  public async createProfile( userData:User){
      return await ic_hello.createProfile( userData);
  }
  public async test(){
    return await ic_hello.createEssayInfo();
  }
  public async getUserId(){
    return await ic_hello.whoami();
  }
}
