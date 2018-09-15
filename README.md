# EP-Assignment

Online Assignment for Elastic-Path.
Main goal: learn to use the Cortex API.

# What is done?

- Development of an Angular 6 application
- Public authentication
- Find items by keywords
- Pagination
- Disabling unavailable items
- Add items to cart
- Cart review
- Dockerization of the application
- Deployment of an Nginx server (not necessary, but Docker does not work the exact same way between MacOS, Windows and Linux, an HTTP server makes it very similar and adds no complexity)

# What is not done?

I could not finish the complete checkout, because a lot of documentation is not available for release 7.3 and I could not find out how to POST a customer address and a payment method

# How to run it?

The app is dockerized, but is also runnable without Docker.

If you don't have Docker installed, you need both node and npm instead, then run:

```
npm install
npm install -g @angular/cli
ng serve
```

Open a browser and visit `http://localhost:4200`

If you have Docker:

```
docker build -t angular-ep .
docker run -d -p 80:80 angular-ep
```

Open a browser and visit `http://localhost:80`
