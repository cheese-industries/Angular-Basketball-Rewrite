import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NpbService {
  constructor(private http: HttpClient) {}

  getNpbData(): Observable<any[]> {
    //REST request to MLB
    //Will return that data asynchronously
    return this.http.get<any[]>(
      'https://danl.ee/npb.json'
    );
  }
}
