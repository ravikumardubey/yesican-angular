import { Directive, ElementRef, Input } from "@angular/core";
import { interval, Subscription } from "rxjs";

@Directive({
  selector: "[CountTo]",
})
export class CountToDirective {
  @Input() CountTo!: number;
  @Input() duration!: number;

  private subscription!: Subscription;
  private start: number = 0;
  private step: number = 1;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.subscription = interval(10).subscribe(() => {
      const value = Math.round(this.start * 100) / 100;
      if (value === this.CountTo) {
        this.subscription.unsubscribe();
      } else {
        const diff = this.CountTo - this.start;
        this.step =
          diff > 0
            ? Math.ceil(diff / (this.duration * 100))
            : Math.floor(diff / (this.duration * 100));
        this.start += this.step;
        this.el.nativeElement.innerText = this.start.toFixed(0);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
