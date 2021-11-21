import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthClient} from '@dfinity/auth-client';
//@ts-ignore
import { canisterId, createActor } from "../../../declarations/hello";

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
  async changeRoute(){
    const days = BigInt(1);
    const hours = BigInt(24);
    const nanoseconds = BigInt(3600000000000);
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      this.handleAuthenticated(authClient);
      this.router.navigate(['../login'], { relativeTo: this.route });
    }
    // else{
      await authClient.login({
        onSuccess: async () => {
          this.handleAuthenticated(authClient);
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        identityProvider:
          process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app/#authorize"
            : process.env.LOCAL_II_CANISTER,
        // Maximum authorization expiration is 8 days
        maxTimeToLive: days * hours * nanoseconds,
      });
    // }
    
    
  }
  async handleAuthenticated(authClient: AuthClient) {
    const identity = await authClient.getIdentity();
    const whoami_actor = createActor(canisterId as string, {
      agentOptions: {
        identity,
      },
    });
  }

}
