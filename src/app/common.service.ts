import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

interface myData {
  user: string,
  email: string,
  password: string,
  status: boolean,
  quote: string
}

interface userStatus {
  success:boolean
}

interface contactUs {
  success:boolean
}

interface deleteStatus {
  success:boolean
}

interface isLoggedIn {
  success:boolean
}

interface logoutStatus {
  success:boolean
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  static_URL = "http://localhost:3000";
  public subject = new Subject<any>();
  public changeNavColor = new Subject<any>();

  constructor(private http: HttpClient) { }

  getData() {       
      return this.http.get<myData>(this.static_URL + '/api/getData')
  }
  
  registerUser(value) { 
      return this.http.post<contactUs>(this.static_URL + '/api/registerUser', {
          value
      })
  }

  updateUser(value) { 
      return this.http.post<userStatus>(this.static_URL + '/api/updateUser', {
          value
      })
  }

  deleteUser(id) {
    return this.http.post<deleteStatus>(this.static_URL + '/api/deleteUser', {
        id
    })
  }

  isLoggedIn(): Observable<isLoggedIn> {
          
      return this.http.get<isLoggedIn>(this.static_URL + '/api/isLoggedIn')
  }

  logout() {
      return this.http.get<logoutStatus>(this.static_URL + '/api/logout')
  }

  contactUs(value) { 
    return this.http.post<userStatus>(this.static_URL + '/api/contactUs', {
        value
      })
  }

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessages() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}
