import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MonitorApiService {

  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getProblems() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .get(`http://${this.baseUrl}/problems/`, { headers: headers });
  }

  getAlerts(filter) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .get(`http://${this.baseUrl}/alerts/?search=${filter}`, { headers: headers });
  }

  getFilterAdvise(query, catalogType) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (query === '' && catalogType === 'ALL') {
      return this.http.get(`http://${this.baseUrl}/top-problems`, { headers: headers });
    }

    return this.http.get(`http://${this.baseUrl}/filter-advise?search=${query}`, { headers: headers });
  }

  getApplications() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get(`http://${this.baseUrl}/applications/`, { headers: headers });
  }

  getControls() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get(`http://${this.baseUrl}/controls/`, { headers: headers });
  }

  getUnits() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' });

    return this.http.get(`http://${this.baseUrl}/units/`, { headers: headers });
  }

  getBodyTypes() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' });

    return this.http.get(`http://${this.baseUrl}/body-types/`, { headers: headers });
  }

  getControlTypes() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' });

    return this.http.get(`http://${this.baseUrl}/control-types/`, { headers: headers });
  }

  postProblem(problem) {

    return;
  }

}
