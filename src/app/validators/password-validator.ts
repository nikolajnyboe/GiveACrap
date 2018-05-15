import {AbstractControl} from '@angular/forms';

export class PasswordValidator {
  static matchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let confirmPassword = AC.get('password2').value;

    if(password != confirmPassword) {
      return AC.get('password2').setErrors( {matchPassword: true} );
    } else {
      return null;
    }
  }
}