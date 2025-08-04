import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null; // valid
  }

  return { doesNotContainQuestionMark: true }; // invalid
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null); // Simulate an async check
  }
  return of({ emailIsNotUnique: true });  // Simulate an async check
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
    })
  });

  get emailIsIInvalid() {
    return (
      this.form.controls.email.invalid &&
      this.form.controls.email.touched &&
      this.form.controls.email.dirty
    )
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.invalid &&
      this.form.controls.password.touched &&
      this.form.controls.password.dirty
    )
  }
  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}