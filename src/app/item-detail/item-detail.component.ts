import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { ItemsActions } from '../items.actions';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../entities/item';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private fb: FormBuilder,
    private itemsActions: ItemsActions
  ) { }

  subscription: Subscription;
  id: String = this.route.snapshot.params.id;
  item: Item;
  updateItemForm: FormGroup;

  deleteItem(): void {
    this.itemsActions.deleteItem(this.item.id);
    this.router.navigate(['home']);
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const item: Item = form.value as Item;
      this.itemsActions.updateItem(this.item.id, item);
    }
    else {
      console.log('form invalid');
    }
  }

  ngOnDestroy(): void {
    // Always unsubscribe on destroy.
    this.subscription.unsubscribe();
    this.itemsActions.clearSelectedItem();
  }

  ngOnInit(): void {
    this.itemsActions.getItem(this.id);
    this.subscription = this.ngRedux.select(state => state.items).subscribe(items => {
      this.item = items.selectedItem;
      console.log("selectedItem", this.item);

      if (this.item != undefined) {
        this.updateItemForm.setValue({
          name: this.item.name,
          description: this.item.description
        })
      }
    });
    this.updateItemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get name() { return this.updateItemForm.get('name'); }
  get description() { return this.updateItemForm.get('description'); }

  getErrorMessage(formControl) {
    const errors = formControl.errors;
    let errorMessage: String;

    if (errors.required) {
      errorMessage = 'Must be filled out';
    }

    return errorMessage;
  }

}
