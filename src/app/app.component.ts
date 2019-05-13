import { Component, ChangeDetectorRef } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router,
    Event, RouterOutlet, ActivatedRoute } from '@angular/router';
import { slideInAnimation } from './page-animation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        slideInAnimation
    ]
})
export class AppComponent {
    title = 'Backbase Weather App';

    loading: boolean;
    showBackArrow: boolean;

    constructor(private router: Router, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {
        router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
        });
    }

    // we hook into router events to display a spinner during transitions
    checkRouterEvent(routerEvent: Event): void {
        if (routerEvent instanceof NavigationStart) {
            this.loading = true;
            this.cdRef.detectChanges();
        }

        if (routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {
            this.loading = false;
            this.cdRef.detectChanges();
        }
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }
}
