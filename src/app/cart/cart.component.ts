import {Component, OnInit} from '@angular/core';
import {CartService} from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) {
  }

  numberOfItems = 0;
  price = {};
  discount = {};
  itemsInCart = [];
  order = {};

  ngOnInit() {
    const access = JSON.parse(localStorage.getItem('access'));
    const token = access['access_token'];
    this.cartService.getCart(token).subscribe((data) => {
      const defaultCartBody = data.body;
      const defaultCartLinks = defaultCartBody['links'];
      defaultCartLinks.forEach((link) => {
        if (link.rel === 'total') {
          this.cartService.getTotal(token, link.href).subscribe((total) => {
            const totalBody = total.body;
            const totalPrice = totalBody['cost'][0];
            this.price['amount'] = totalPrice['amount'];
            this.price['currency'] = totalPrice['currency'];
            this.price['display'] = totalPrice['display'];
          });
        }
        if (link.rel === 'discount') {
          this.cartService.getInfo(token, link.href).subscribe((discount) => {
            const discountBody = discount.body;
            const discountValue = discountBody['discount'][0];
            this.discount['amount'] = discountValue['amount'];
            this.discount['currency'] = discountValue['currency'];
            this.discount['display'] = discountValue['display'];
          });
        }
        if (link.rel === 'order') {
          this.cartService.getInfo(token, link.href).subscribe((order) => {
            /* Nothing can be done: API documentation is missing for this */
          });
        }
        if (link.rel === 'lineitems') {
          this.cartService.getItems(token, link.href).subscribe((items) => {
            const itemsBody = items.body;
            const itemsLinks = itemsBody['links'];
            itemsLinks.forEach((itemLink) => {
              const itemInCart = {};
              if (itemLink.type === 'carts.line-item') {
                this.cartService.getItem(token, itemLink.href).subscribe((lineItem) => {
                  const lineItemBody = lineItem.body;
                  const quantity = lineItemBody['quantity'];
                  itemInCart['quantity'] = quantity;
                  const itemLinks = lineItemBody['links'];
                  itemLinks.forEach((l) => {
                    if (l.rel === 'total') {
                      this.cartService.getInfo(token, l.href).subscribe((total) => {
                        const totalBody = total.body;
                        const totalCost = totalBody['cost'][0];
                        const price = {};
                        price['amount'] = totalCost['amount'];
                        price['currency'] = totalCost['currency'];
                        itemInCart['total'] = price;
                      });
                    }
                    if (l.rel === 'price') {
                      this.cartService.getInfo(token, l.href).subscribe((price) => {
                        const priceBody = price.body;
                        const priceCost = priceBody['purchase-price'][0];
                        const unitPrice = {};
                        unitPrice['amount'] = priceCost['amount'];
                        unitPrice['currency'] = priceCost['currency'];
                        itemInCart['price'] = unitPrice;
                      });
                    }
                    if (l.rel === 'item') {
                      this.cartService.getInfo(token, l.href).subscribe((itemInfo) => {
                        const itemInfoBody = itemInfo.body;
                        const links = itemInfoBody['links'];
                        const index = links.findIndex(ld => ld.rel === 'definition');
                        const linkDefinition = links[index];
                        this.cartService.getInfo(token, linkDefinition.href).subscribe((definition) => {
                          const definitionBody = definition.body;
                          const displayName = definitionBody['display-name'];
                          itemInCart['name'] = displayName;
                        });
                      });
                    }
                  });
                });
              }
              this.itemsInCart.push(itemInCart);
            });
          });
        }
      });
      this.numberOfItems = defaultCartBody['total-quantity'];
    });
  }
}
