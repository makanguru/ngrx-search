import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';

import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserSearchComponent } from './users/user-search/user-search.component';
import { UiModule } from './shared/ui.module';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserItemComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot({}),
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }








