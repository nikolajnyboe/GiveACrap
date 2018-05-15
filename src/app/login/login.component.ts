import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      console.log(form.value)
    }
    else {
      console.log('form invalid')
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  getErrorMessage(formControl) {
    const errors = formControl.errors;
    let errorMessage: String;

    if (errors.required) {
      errorMessage = 'Must be filled out';
    } else if (errors.email) {
      errorMessage = 'Not a valid email';
    }

    return errorMessage;
  }

}
