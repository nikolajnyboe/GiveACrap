import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../entities/user';
import { PasswordValidator } from '../validators/password-validator';
import { UsersActions } from '../users.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersActions: UsersActions,
    private router: Router
  ) { }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const user: User = form.value as User;
      console.log(user)
      this.usersActions.createUser(user);
      this.router.navigate(['users']);
    }
    else {
      console.log('form invalid')
    }
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    }
    ,{
      validator: PasswordValidator.matchPassword
    });
  }

  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get password2() { return this.registerForm.get('password2'); }

  getErrorMessage(formControl) {
    const errors = formControl.errors;
    let errorMessage: String;

    if (errors.required) {
      errorMessage = 'Must be filled out';
    } else if (errors.email) {
      errorMessage = 'Not a valid email';
    } else if (errors.matchPassword) {
      errorMessage = 'Passwords don\'t match' ;
    }

    return errorMessage;
  }

}
