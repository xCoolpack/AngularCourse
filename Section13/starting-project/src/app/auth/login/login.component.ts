import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const sub = this.form().valueChanges?.pipe(
        debounceTime(500)
      )
      .subscribe({
        next: (val) => window.localStorage.setItem('saved-login-form', JSON.stringify({email: val.email}))
      });

      this.destroyRef.onDestroy(() => sub?.unsubscribe());
    });
  }

  onSubmit(formData: NgForm) {
    if (!formData.form.valid) {
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    formData.form.reset();

  }
}
