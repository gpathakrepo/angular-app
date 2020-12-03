import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }
  public bardata: Observable<any[]>;
  // readonly endpoint =  'https://lpo0x7xm6e.execute-api.us-east-2.amazonaws.com/ri_v2/chart?chartid=1';
  // readonly endpoint = 'http://localhost:8080/examples/counts_by_date.json';
  readonly endpoint1 = 'https://704d4o4at8.execute-api.us-east-2.amazonaws.com/ri_dev_v3/chart?chartid=1&';
  readonly endpoint2 = 'https://704d4o4at8.execute-api.us-east-2.amazonaws.com/ri_dev_v3/chart?chartid=2&';
  readonly endpoint3 = 'https://704d4o4at8.execute-api.us-east-2.amazonaws.com/ri_dev_v3/chart?chartid=3&';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  getLineChartData(obj1: any): Observable<Object> {
    return this.http.get(this.endpoint1 + obj1);
  }

  getBarChartData(obj1: any): Observable<any> {
    console.log(obj1);
    return this.http.get(this.endpoint2 + obj1);
  }

  // getDataforMap(value: string): Observable<any> {
  //   return this.http.get(this.endpoint2 + value);
  // }

  getDataforMap(value: string): Observable<any> {
    console.log(this.endpoint3 + value);
    return this.http.get(this.endpoint3 + value);
  }

}
