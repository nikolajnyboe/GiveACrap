import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { AccountComponent } from './account/account.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'item-detail/:id', component: ItemDetailComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
  { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule' },
  { path: 'create-item', loadChildren: './modules/create-item/create-item.module#CreateItemModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
