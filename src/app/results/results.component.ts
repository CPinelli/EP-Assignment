import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../app.service';
import {Config} from 'protractor';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  keywords = '';
  items = [];
  numberOfItems = 0;
  resultOnPage = 20;
  numberOfPages = 0;
  requestedPage = 1;

  constructor(private route: ActivatedRoute, private appService: AppService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.items = [];
      this.keywords = params['keywords'];
      this.route.queryParams.subscribe(queryParams => {
        const requestedPage = queryParams['page'];
        if (requestedPage === null || requestedPage === undefined) {
          this.requestedPage = 1;
        } else {
          this.requestedPage = requestedPage;
        }
      });
      this.refresh();
    });
  }

  refresh() {
    const access = JSON.parse(localStorage.getItem('access'));
    const token = access['access_token'];
    this.appService.getForm(token).subscribe((data: Config) => {
      const form = data.body.links[0].href;
      this.appService.postForm(token, form, this.keywords).subscribe(
        (response) => {
          const location = response.headers.get('Location');
          const paginationLocation = location.replace(/[0-9]+(?!.*[0-9])/, this.requestedPage.toString());
          this.appService.fetchItems(token, paginationLocation).subscribe(
            (itemsResponse) => {
              const responseBody = itemsResponse.body;
              const itemLinks = responseBody['links'];
              this.numberOfItems = responseBody['pagination'].results;
              this.numberOfPages = Math.ceil(this.numberOfItems / this.resultOnPage);
              itemLinks.forEach((item) => {
                if (item.type === 'items.item') {
                  const uri = item.href;
                  const itemToStore = {};
                  itemToStore['uri'] = item.uri;
                  this.appService.getItem(token, uri).subscribe(
                    (itemInfo) => {
                      const itemInfoBody = itemInfo.body;
                      const itemInfoLinks = itemInfoBody['links'];
                      itemInfoLinks.forEach((link) => {
                        const itemInfoUri = link.href;
                        if (link.rel === 'availability') {
                          this.appService.getDefinition(token, itemInfoUri).subscribe(
                            (availability) => {
                              const availabilityBody = availability.body;
                              const state = availabilityBody['state'];
                              itemToStore['state'] = state;
                            }
                          );
                        }
                        if (link.rel === 'price') {
                          this.appService.getDefinition(token, itemInfoUri).subscribe(
                            (price) => {
                              const priceBody = price.body;
                              const amount = priceBody['list-price'][0].amount;
                              const currency = priceBody['list-price'][0].currency;
                              itemToStore['price'] = {amount: amount, currency: currency};
                            }
                          );
                        }
                        if (link.rel === 'addtocartform') {
                          this.appService.getDefinition(token, itemInfoUri).subscribe(
                            (addToCart) => {
                              const addToCartBody = addToCart.body;
                              const addToCartForm = addToCartBody['links'][0].href;
                              itemToStore['addToCartForm'] = addToCartForm;
                            }
                          );
                        }
                        if (link.rel === 'definition') {
                          this.appService.getDefinition(token, itemInfoUri).subscribe(
                            (definition) => {
                              const definitionBody = definition.body;
                              const displayName = definitionBody['display-name'];
                              itemToStore['name'] = displayName;
                            }
                          );
                        }
                      });
                    }
                  );
                  this.items.push(itemToStore);
                }
              });
            });
        });
    });
  }

  addToCart(form) {
    const access = JSON.parse(localStorage.getItem('access'));
    const token = access['access_token'];

    const itemFormUri = form.split('/carts')[1];
    const itemUri = itemFormUri.split('/form')[0];
    let quantity = document.getElementById(itemUri)['value'];
    if (quantity === null || quantity === undefined || quantity <= 0) {
      quantity = 1;
    }

    this.appService.addToCart(token, form, quantity).subscribe((response) => {
      if (response.status === 201) {
        alert('Item successfully added in your cart!');
      } else {
        alert('Unable to add this item in the cart, please try again later');
      }
    });
  }
}
