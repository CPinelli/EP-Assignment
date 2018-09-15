# EP-Assignment

Online Assignment for Elastic-Path.
Main goal: learn to use the Cortex API.

# What is done?

- Development of an Angular 6 application
- Public authentication
- Find items by keywords
- Add items to the cart
- Review the cart
- Dockerization of the application
- Deployment of an Nginx server (not necessary, but Docker does not work the exact same way between MacOS, Windows and Linux, an HTTP server makes it very similar and adds no complexity)

# What is not done?

I could not finish the complete checkout, because a lot of documentation is not available for release 7.3 and I could not find out how to POST a customer address and a payment method

# How to run it?

The project is dockerized, but it is also runnable without.

If you don't have Docker, you need node and npm instead:

`npm install`
`npm install -g @angular/cli`

`ng serve`

Open a browser on `http://localhost:4200`

If you have Docker:

`docker build -t angular-ep .`
`docker run -d -p 80:80 angular-ep`

Open a browser on `http://localhost:4200`
