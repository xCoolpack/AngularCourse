import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000); // observables have no initial values!!
  intervalSignal = toSignal(this.interval$, { initialValue: 0 }); // signal automaticaly clean up observables, manualCleanup can be set
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);

  customInteval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      // subscriber.error();
      if (timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value ...');
      subscriber.next({ message: 'New value' });
      timesExecuted++;
    }, 2000);
  });

  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`)
    // });
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.interval.update(prev => prev + 1);
    // }, 500);

    // const subscription = interval(500).pipe(
    //   map((val) => val * 2) //operator
    // ).subscribe({
    //   next: (val) => console.log(val)
    // });
    this.customInteval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('Completed'),
      error: (err) => console.log(err)
    });

    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${val} times.`)
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1)
  }
}
