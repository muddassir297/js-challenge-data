import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private baseUrl:string = "http://localhost:8080/api";
  private endUrl:string; 
  private data;
  constructor(private http: HttpClient) { }

  postData(url, data):Observable<any> {
    this.endUrl = this.baseUrl + url
    return this.http.post<any>(this.endUrl, data, httpOptions);
  }

  updateData(url, data):Observable<any> {
    this.endUrl = this.baseUrl + url
    return this.http.put<any>(this.endUrl, data, httpOptions);
  }

  getData(url:string): Observable<any> {
    this.endUrl = this.baseUrl + url
    return this.http.get<any>(this.endUrl);
  }
  
  delete(url:string){
    this.endUrl = this.baseUrl + url
    return this.http.delete<any>(this.endUrl);
  }
}
