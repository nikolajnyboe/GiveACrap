import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateItemRoutingModule } from './create-item-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateItemComponent } from '../../create-item/create-item.component';

@NgModule({
  imports: [
    CommonModule,
    CreateItemRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CreateItemComponent
  ]
})
export class CreateItemModule { }
