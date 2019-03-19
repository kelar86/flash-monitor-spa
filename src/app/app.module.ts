import { StorageService } from './services/storage.service';
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
import { DealerPanelComponent } from './components/dealer-panel/dealer-panel.component';
import { AlertGridComponent } from './components/alert-grid/alert-grid.component';
import { EmergencyIconsComponent } from './components/emergency-icons/emergency-icons.component';
import { ProblemFormService } from './services/problem-form.service';
import { AuthenticationModalComponent } from './components/authentication-modal/authentication-modal.component';
import { SelectWithTypeaheadComponent } from './components/select-with-typeahead/select-with-typeahead.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ClockComponent,
    HeaderContainerComponent,
    ProblemFormComponent,
    DealerPanelComponent,
    AlertGridComponent,
    EmergencyIconsComponent,
    AuthenticationModalComponent,
    SelectWithTypeaheadComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  entryComponents: [ProblemFormComponent, AuthenticationModalComponent],
  providers: [
    StorageService,
    ProblemFormService, 
    MonitorApiService, 
    HttpClient,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
