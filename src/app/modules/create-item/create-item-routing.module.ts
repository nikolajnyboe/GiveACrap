import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateItemComponent } from '../../create-item/create-item.component';
import { AuthGuardService } from '../../auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: CreateItemComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateItemRoutingModule { }
