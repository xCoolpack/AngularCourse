import {
  AfterContentInit,
  afterNextRender,
  afterRender,
  Component,
  contentChild,
  ElementRef,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    //'(click)': 'onClick()', <-example
  },
})
export class ControlComponent implements AfterContentInit {
  // @HostBinding('class') className = 'control';
  // @HostListener('click') onClick() { method body };
  // private el = inject(ElementRef); <- getting properties of this component

  label = input.required<string>();
  // @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>; // older approach
  private control =
    contentChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(
      'input'
    );
  
  constructor() {
    // Whenever something change even outside component
    afterRender(() => {
      // console.log('afterRender')
    });

    afterNextRender(() => {
      // console.log('afterNextRender')
    })
  }

  ngAfterContentInit() {
    console.log(this.control().nativeElement);
  }
}
