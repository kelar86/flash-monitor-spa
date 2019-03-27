import { StorageService } from './services/storage.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
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
import { AuthenticationModalComponent } from './components/authentication-modal/authentication-modal.component';
import { SelectWithTypeaheadComponent } from './components/select-with-typeahead/select-with-typeahead.component';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { APP_ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { ErrorInterceptor } from './helpers/error.interceptor';

registerLocaleData(ru);

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
    SelectWithTypeaheadComponent,
    DashboardComponent,
    LoginPageComponent,

    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  entryComponents: [ProblemFormComponent, AuthenticationModalComponent],
  providers: [
    StorageService,
    MonitorApiService,
    HttpClient,
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
