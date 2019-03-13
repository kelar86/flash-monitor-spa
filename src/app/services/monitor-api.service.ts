import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonitorApiService {

  constructor(private http: HttpClient) { }

  getProblems() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .get(`http://localhost:8000/api/problems/`, { headers: headers })
  }

  search(query) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (query === '') {
      return this.http.get(`http://localhost:8000/api/advise-search`, { headers: headers })
    }

    return this.http.get(`http://localhost:8000/api/search?search=${query}`, { headers: headers });
  }
}
