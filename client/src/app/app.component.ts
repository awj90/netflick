import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { HandGestureService } from './services/hand-gesture.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  navbg: any;
  hideCanvas: boolean = false; // Show canvas initially

  constructor(
    private handGestureService: HandGestureService,
  ) {}

  @HostListener('document:scroll') scrollover() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#000000',
      };
    } else {
      this.navbg = {};
    }
  }

  get stream(): MediaStream {
    return this.handGestureService.stream;
  }

  ngAfterViewInit(): void {
    this.handGestureService.initialize(
      this.canvas.nativeElement,
      this.video.nativeElement
    );
  }

  toggleVideoVisibility(): void {
    this.hideCanvas = !this.hideCanvas;
  }
}
