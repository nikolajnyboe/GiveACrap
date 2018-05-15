import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../entities/item';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  private createForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const item: Item = form.value as Item;
      console.log(item)
    }
    else {
      console.log('form invalid')
    }
  }

  get name() { return this.createForm.get('name'); }
  get description() { return this.createForm.get('description'); }

  getErrorMessage(formControl) {
    const errors = formControl.errors;
    let errorMessage: String;

    if (errors.required) {
      errorMessage = 'Must be filled out';
    }

    return errorMessage;
  }

}
