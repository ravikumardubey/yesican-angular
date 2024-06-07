import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  ChangeDetectorRef,
  OnInit,
  PLATFORM_ID,
  NgZone,
} from '@angular/core';
import { interval } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showNavigationArrows = true;
  showNavigationIndicators = false;
  changeCount = 0;
  titleText = 'Positive Thinking';
  showHomeContent = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private _ref: ChangeDetectorRef
  ) {
    this.zone.runOutsideAngular(() => {
      interval(2000).subscribe(() => {
        (this.changeCount = this.changeCount + 1),
          this.changeCount == 1
            ? (this.titleText = 'Developing Competence')
            : this.changeCount == 2
            ? (this.titleText = 'Growth & Success')
            : this.changeCount == 3
            ? (this.titleText = 'Happiness')
            : this.changeCount == 4
            ? (this.titleText = 'Positive Thinking')
            : '';
        this.changeCount == 4 ? (this.changeCount = 0) : '';
        this._ref.detectChanges();
      });
    });
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.showHomeContent = true;
    }
  }
}
