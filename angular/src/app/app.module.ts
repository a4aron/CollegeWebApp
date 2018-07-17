import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http"
import { MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatSelectModule,
        MatProgressSpinnerModule} from '@angular/material';


import { AppComponent } from './app.component';
import { NewsCreateComponent } from './news/news-create/news-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './kitchen/menu/menu.component';
import { MenuListComponent } from './kitchen/menu-list/menu-list.component';
import { MenuSessionItemComponent } from './kitchen/SessionItem/menu-session-item/menu-session-item.component';


@NgModule({
  declarations: [
    AppComponent,
    NewsCreateComponent,
    HeaderComponent,
    NewsListComponent,
    LoginComponent,
    MenuComponent,
    MenuListComponent,
    MenuSessionItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
