import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../entities/item';
import { Router } from '@angular/router';
import { ItemsActions } from '../items.actions';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private itemsActions: ItemsActions,
    private router: Router
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
      this.itemsActions.createItem(item);
      this.router.navigate(['home']);
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
