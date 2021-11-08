import { Component } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


export class AppComponent {
  timeout!: NodeJS.Timeout;
  routerChanged = true;
  routerShow = false;
  constructor(private router: Router) {
    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        // Show loading indicator
        this.routerChanged = true;
        this.routerShow = !this.routerChanged;
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout);
          this.routerChanged = false;
          this.routerShow = !this.routerChanged;
        }, 1000);
      }
    });
  }
}
