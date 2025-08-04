import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('save-login-form');
      if (savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        setTimeout(() => {
          this.form().controls['email'].setValue(savedEmail);
        }, 1);
      }

      const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => window.localStorage.setItem(
          'save-login-form', 
          JSON.stringify({ email: value.email })),
      });
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    
    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    console.log('Form Submitted:', formData.form);
    console.log(enteredEmail, enteredPassword);
  }
}
