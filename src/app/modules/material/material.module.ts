import { NgModule } from '@angular/core';
import {MatButtonModule, MatInputModule, MatCardModule, MatRadioModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule
  ],
  declarations: []
})
export class MaterialModule { }