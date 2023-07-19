import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime, filter, tap } from 'rxjs';
import { HandGestureService } from '../services/hand-gesture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  selectSubscription$!: Subscription;

  constructor(
    private handGestureService: HandGestureService,
    private router: Router
  ) {}

  ngOnInit() {
    this.handGestureService.resetLast();
    this.selectSubscription$ = this.handGestureService.gesture$
      .pipe(
        tap((value) => console.info('Gestured: ', value)),
        filter((value) => value === 'ok'),
        debounceTime(500)
      )
      .subscribe({
        next: (value) => {
          if (value === 'ok') {
            this.router.navigate(['/movie-genres']);
          }
        },
        error: (error) => {
          alert(error);
          console.info(error);
        },
      });
  }

  ngOnDestroy(): void {
    // clean up subscriptions
    this.selectSubscription$.unsubscribe();
  }
}
