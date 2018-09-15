import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {
  }

  getForm(token) {
    return this.http.get('http://christophe.epdemos.com/cortex/searches/vestri/keywords/form', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/x-www-form-urlencoded'),
      observe: 'response'
    });
  }

  postForm(token, form, keywords) {
    return this.http.post(form, {
      keywords: keywords
    }, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  fetchItems(token, link) {
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

  getDefinition(token, link) {
    return this.http.get(link, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token),
      observe: 'response'
    });
  }

  addToCart(token, form, quantity) {
    return this.http.post(form, {
      quantity: quantity
    }, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token)
        .set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }

  authenticate() {
    return this.http.post('http://christophe.epdemos.com/cortex/oauth2/tokens',
      'grant_type=password&scope=vestri&role=PUBLIC',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }
}
