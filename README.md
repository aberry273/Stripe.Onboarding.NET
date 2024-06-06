# Stripe SA Onboarding .NET

## Summary
This is a sandbox site for running stripe payments, as a part of the Solution Architect role. This is built on .NET 8, using AlpineJs for the front-end and PicoCSS for styling.

This site is an MVC based build rather than SPA. However the front-end utilises templating and DOM manipulating through alpineJS.

Public site: https://stripesandbox.azurewebsites.net

*Note: This public site uses a free version of Azure App services which will turn off after some time, on inital boot up it may take time to load*

## Setup
How to build, configure and run your application.

### Backend setup
1. Download and install .NET 8.0.2 (runtimes) https://dotnet.microsoft.com/en-us/download/dotnet/8.0
2. Build the web project 
`dotnet build .\src\Projects\Stripe.Onboarding.App\Stripe.Onboarding.App.csproj`
3. Run the .NET app:
`dotnet run .\src\Projects\Stripe.Onboarding.App\Stripe.Onboarding.App.csproj`


### Frontend setup
*Note: this is not relevant to the Stripe integration, but for a better understanding of how the frontend works - if you see x-data or init() functions*
The frontend is build using AlpineJs and does not need any prebuild/task runners to run. All files are located within the /wwwroot/src/js/ file in the Stripe.Onboarding.App projects.
To learn more about AlpineJS, see: https://alpinejs.dev/start-here

The front-end is using PicoCSS (https://picocss.com/)



## Solution overview

### Project setup
This solution is structured in a way to enable monolith applications that can be easily separated into separate macro, mini or micro services.

All projects are built under the namespace Stripe.Onboarding

#### Projects 
- Applications and services that share feature/foundation components
**1Stripe.Onboarding.App**
- Currently the main project/bootstrap project for the website

#### Features
- Shared domain logic, feature projects can inherit and use as many foundation projects as required, but never require each other.
**1. Stripe.Onboarding.Features.Cart**
- Contains all cart/checkout logic
- Inherits from Foundations.Common, Foundations.Integrations.Stripe, Foundations.Products, Foundations.Integrations.Authentication,
**2. Stripe.Onboarding.Features.Payments**
- This is not currently used for anything except the PaymentWebhooksApi
- In time this project may be used for more lowlevel integration with stripe and non-checkout integrations and low level payment objects (Payment Intent, Charge integrations). 

#### Foundations
- Core domain specific logic, foundation projects are isolated libraries used by Features and Projects.
**1. Stripe.Onboarding.Foundations.Authentication**
- Only contains a mock service for auth/auth.
**2. Stripe.Onboarding.Foundations.Products**
- Only contains a mock service for a product catalog
**3. Stripe.Onboarding.Foundations.Integrations.Stripe**
- Contains the StripeCheckoutService which manages all Checkout integration logic for Stripe
- Future cases would integrate different products of Stripe as their own service
**4. Stripe.Onboarding.Foundations.Common**
- Shared components for each project

How does the solution work? Which Stripe APIs does it use? How is your application architected?

**Stripe Checkout**
- This project only integrates with Stripe Checkout, providing users with the ability to checkout with the Hosted Page (redirect), Embedded Form (iFrame) or Custom Flow (integrated) checkout components.


## Problem state
> How did you approach this problem? Which docs did you use to complete the project? What challenges did you encounter?

I was originally going to build a uCommerce/Umbraco site to have a more traditional eCommerce site with built in OMS/catalog functionality. However I decided that most standard eCommerce platforms will typically have a Stripe module/integration pre-built that would handle most of the integration. Instead I wanted to built a bespoke solution that is more flexible to replicate potential unique usescases that a startup or larger business may have.

## Future state
> How you might extend this if you were building a more robust instance of the same application.

While this site currently only integrates with the checkout products, I will continue to tweak it to implement more complex projects with Stripe. One potential example would be whether a PiX product can be built on Stripe.
