import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { IAppState, rootReducer } from './store/store';
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { createLogger } from 'redux-logger';
import { UsersActions } from './users.actions';
import { UsersService } from './users.service';
import { UsersEpic } from './users.epic';
import { HttpClientModule } from '@angular/common/http';
import { ItemsActions } from './items.actions';
import { ItemsService } from './items.service';
import { ItemsEpic } from './items.epic';
import { AuthGuardService } from './auth-guard.service';
import { ItemsFilterPipe } from './items-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountComponent } from './account/account.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ItemsFilterPipe,
    AccountComponent,
    ItemDetailComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    FormsModule
  ],
  providers: [AuthGuardService, UsersActions, UsersService, UsersEpic, ItemsActions, ItemsService, ItemsEpic],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter,
    private usersEpic: UsersEpic,
    private itemsEpic: ItemsEpic
  ) {

      // From app.module.ts - constructor
      const rootEpic = combineEpics(
        this.usersEpic.getUsers,
        this.usersEpic.createUser,
        this.usersEpic.updateUser,
        this.usersEpic.deleteUser,
        this.usersEpic.login,
        this.itemsEpic.getItems,
        this.itemsEpic.getItem,
        this.itemsEpic.createItem,
        this.itemsEpic.updateItem,
        this.itemsEpic.deleteItem
        // Each epic is referenced here.
      );

      // Middleware
      const middleware = [
        createEpicMiddleware(rootEpic), createLogger({ level: 'info', collapsed: true })
      ];

      this.ngRedux.configureStore(
        rootReducer,
        {},
        middleware,
        [ devTool.isEnabled() ? devTool.enhancer() : f => f]
      );

      ngReduxRouter.initialize(/* args */);
  }
}
