import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUser(password:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getStudent/${password}`);
  }

}
