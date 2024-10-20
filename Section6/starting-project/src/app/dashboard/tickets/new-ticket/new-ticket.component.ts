import {
  AfterViewInit,
  Component,
  ElementRef,
  output,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements AfterViewInit {
  // @ViewChild('formTempleVariable') form?: ElementRef<HTMLFormElement>; // older approach
  private form =
    viewChild.required<ElementRef<HTMLFormElement>>('formTempleVariable');
  // @Output() add = new EventEmitter(); // older approach
  add = output<{ title: string; request: string }>();

  ngAfterViewInit(): void {
    console.log(this.form().nativeElement);
  }

  onSubmit(title: string, request: string) {
    this.add.emit({ title: title, request: request });
    this.form().nativeElement.reset();
  }
}
