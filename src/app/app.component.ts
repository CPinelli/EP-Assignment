import {Component} from '@angular/core';
import {AppService} from './app.service';
import {Config} from 'protractor';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Elastic Path - Checkout assignment';
  keywords = '';

  constructor(private appService: AppService, private router: Router) {
    const access = localStorage.getItem('access');
    if (access === null) {
      this.auth();
    }
  }

  auth() {
    this.appService.authenticate().subscribe(
      (data: Config) => localStorage.setItem('access', JSON.stringify(data)), // success path
      error => console.error('data = ' + JSON.stringify(error)) // error path
    );
  }

  redirectToResults() {
    if (this.keywords !== '') {
      this.router.navigate(['/results/' + this.keywords], {queryParams: {page: 1}});
    } else {
      alert('Keywords can\'t be empty');
    }
  }

  redirectToCart() {
    this.router.navigate(['/cart']);
  }
}
