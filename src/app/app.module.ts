import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonitorApiService } from './services/monitor-api.service';
import { ClockComponent } from './components/clock/clock.component';
import { HeaderContainerComponent } from './components/header-container/header-container.component';
import { ProblemFormComponent } from './components/problem-form/problem-form.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ClockComponent,
    HeaderContainerComponent,
    ProblemFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [MonitorApiService, HttpClient,
    HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
