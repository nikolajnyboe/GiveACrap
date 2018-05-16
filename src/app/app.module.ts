import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { CreateItemComponent } from './create-item/create-item.component';
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
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CreateItemComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot()
  ],
  providers: [UsersActions, UsersService, UsersEpic],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter, private usersEpic: UsersEpic) {

      // From app.module.ts - constructor
      const rootEpic = combineEpics(
        this.usersEpic.getUsers,
        this.usersEpic.createUser
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
