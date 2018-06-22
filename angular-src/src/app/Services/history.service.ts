import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http:Http, public auth: AuthService) { }

  getCustomers() {
    let headers = new Headers();
    this.auth.loadToken();
    headers.append('Authorization', this.auth.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/chats/customers', {headers: headers}).pipe(map(res => res.json()));
  }

  getCustomerChatLog(customerId: string) {
    let headers = new Headers();
    this.auth.loadToken();
    headers.append('Authorization', this.auth.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/chats/history', {headers: headers, params: {'customerId': customerId}}).pipe(map(res => res.json()));
  }
}
