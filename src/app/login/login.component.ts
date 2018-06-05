import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { UsersActions } from '../users.actions';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private ngRedux: NgRedux<IAppState>,
    private usersActions: UsersActions,
    private router: Router
  ) { }

  loginForm: FormGroup;
  subscription: Subscription;

  ngOnDestroy(): void {
    // Always unsubscribe on destroy.
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const email = form.value.email;
      console.log(email)
      this.usersActions.login(email);
      this.subscription = this.ngRedux.select(state => state.users).subscribe(users => {
        if (users.currentUser != undefined) {
          this.router.navigate(['home']);
        }
      });
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
