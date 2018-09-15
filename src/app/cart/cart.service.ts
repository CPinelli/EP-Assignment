import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {
  }

  getCart(token) {
    return this.http.get('http://christophe.epdemos.com/cortex/carts/vestri/default', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token),
      observe: 'response'
    });
  }

  getTotal(token, link) {
    return this.http.get(link, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token),
      observe: 'response'
    });
  }

  getItems(token, link) {
    return this.http.get(link, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token),
      observe: 'response'
    });
  }

  getItem(token, link) {
    return this.http.get(link, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token),
      observe: 'response'
    });
  }

  getInfo(token, link) {
    return this.http.get(link, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token),
      observe: 'response'
    });
  }
}
