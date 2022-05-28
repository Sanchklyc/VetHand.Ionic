import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonHttpService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  post<T>(action: string, body: any): Observable<T> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', '*/*');
    let url = this.buildUrl(action);
    return this.httpClient.post<T>(url, body, { headers: headers });
  }

  get<T>(action: string): Observable<T> {
    let url = this.buildUrl(action);
    return this.httpClient.get<T>(url);
  }

  delete<T>(action: string): Observable<T> {
    let url = this.buildUrl(action);
    return this.httpClient.delete<T>(url);
  }

  put<T>(action: string, body: any): Observable<T> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', '*/*');
    let url = this.buildUrl(action);
    return this.httpClient.put<T>(url, body, { headers: headers });
  }

  private buildUrl(action: string): string {
    return this.apiUrl + '/' + action;
  }
}
