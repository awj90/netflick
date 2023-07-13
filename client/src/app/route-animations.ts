import {
  trigger,
  transition,
  style,
  query,
  animate,
  group,
} from '@angular/animations';

export const slideInAnimation = trigger('slideInAnimation', [
  // Transition between any two states
  transition('* <=> *', [
    // Events to apply
    // Defined style and animation function to apply
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
    // group block executes in parallel
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true })
    ])
  ])
]);

// export const fader = trigger('routeAnimations', [
//   transition('* <=> *', [
//     query(':enter, :leave', [
//       style({
//         position: 'absolute',
//         left: 0,
//         width: '100%',
//         opacity: 0,
//         transform: 'scale(0) translateY()',
//       }),
//     ]),
//     query(':enter', [
//       animate(
//         '600ms ease',
//         style({
//           opacity: 1,
//           transform: 'scale(1) translateY(0)',
//         })
//       ),
//     ]),
//   ]),
// ]);
