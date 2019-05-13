import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('WeatherPage => ForecastPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('600ms cubic-bezier(0.645, 0.045, 0.355, 1)', style({ left: '-100%' }))
                ]),
                query(':enter', [
                    animate('600ms cubic-bezier(0.645, 0.045, 0.355, 1)', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('ForecastPage => WeatherPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('600ms cubic-bezier(0.645, 0.045, 0.355, 1)', style({ left: '100%' }))
                ]),
                query(':enter', [
                    animate('600ms cubic-bezier(0.645, 0.045, 0.355, 1)', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('* => ErrorPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'relative',
                    top: '0vh',
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden'
                })
            ]),
            query(':enter', [
                style({ top: '100vh' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('600ms cubic-bezier(0.645, 0.045, 0.355, 1)', style({ top: '-100vh' }))
                ]),
                query(':enter', [
                    animate('600ms cubic-bezier(0.645, 0.045, 0.355, 1)', style({ top: '0vh' }))
                ])
            ]),
            query(':enter', animateChild()),
        ])
    ]
);
