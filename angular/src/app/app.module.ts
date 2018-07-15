import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http"
import { MatInputModule,
        MatCardModule, 
        MatButtonModule, 
        MatToolbarModule,
        MatExpansionModule,
        MatSelectModule } from '@angular/material';


import { AppComponent } from './app.component';
import { NewsCreateComponent } from './news/news-create/news-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { NewsListComponent } from './news/news-list/news-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NewsCreateComponent,
    HeaderComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
