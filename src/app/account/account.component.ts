import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersActions } from '../users.actions';
import { User } from '../entities/user';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private usersActions: UsersActions,
    private router: Router,
    private ngRedux: NgRedux<IAppState>
  ) { }

  updateUserForm: FormGroup;
  state = this.ngRedux.getState();
  currentUser = this.state.users.currentUser;

  deleteAccount(): void {
    this.usersActions.deleteUser(this.currentUser.id);
    this.usersActions.logout();
    this.router.navigate(['home']);
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const user: User = form.value as User;
      this.usersActions.updateUser(this.currentUser.id, user);
    }
    else {
      console.log('form invalid')
    }
  }

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    if (this.currentUser != undefined) {
      this.updateUserForm.setValue({
        firstname: this.currentUser.firstname,
        lastname: this.currentUser.lastname,
        email: this.currentUser.email
      })
    }
  }

  get firstname() { return this.updateUserForm.get('firstname'); }
  get lastname() { return this.updateUserForm.get('lastname'); }
  get email() { return this.updateUserForm.get('email'); }

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
