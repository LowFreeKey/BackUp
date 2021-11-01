import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//from npm i --save @dfinity/auth-client
//import { Actor, HttpAgent } from "@dfinity/agent";
//import { AuthClient } from "@dfinity/auth-client";
//import idlFactory from "./did";
//import type { _SERVICE } from "./did";
//import { renderIndex } from "./views";
//import { renderLoggedIn } from "./views/loggedIn";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  changeRoute(){
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

}
