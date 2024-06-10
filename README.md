# Stripe SA Onboarding .NET

## Summary
This is a sandbox site for running stripe payments, as a part of the Solution Architect role. This is built on .NET 8, using AlpineJs for the front-end and PicoCSS for styling.

This site is an MVC based build rather than SPA. However the front-end utilises templating and DOM manipulating through alpineJS.
- All html/templates are stored in razor files (.cshtml)
- All razor files are located in relevant feature project

Public site: https://stripesandbox.azurewebsites.net

*Note: This public site uses a free version of Azure App services which will turn off after some time, on inital boot up it may take time to load*

## Setup
How to build, configure and run your application.

### Backend setup (CLI - Broken)
*note:* There is an issue when using the .NET CLI with missing nuget.config package, a pre-compiled zip is available here:

1. Download and install .NET 8.0.2 (runtimes) https://dotnet.microsoft.com/en-us/download/dotnet/8.0
2. restore the project dependencies from the root directory
`dotnet restore stripe.onboarding.sln`
3. Build the web project 
`dotnet build stripe.onboarding.sln`
4. Run the .NET app (debug - otherwise publish after build and run non-debug binaries):
`dotnet run .\Projects\Stripe.Onboarding.App\Stripe.Onboarding.App.csproj`

### Frontend setup
*Note: this is not relevant to the Stripe integration, but for a better understanding of how the frontend works - if you see x-data or init() functions*
The frontend is build using AlpineJs and does not need any prebuild/task runners to run. All files are located within the /wwwroot/src/js/ file in the Stripe.Onboarding.App projects.
To learn more about AlpineJS, see: https://alpinejs.dev/start-here

The front-end is using PicoCSS (https://picocss.com/)


### Local dev setup
This solution uses webhooks, when running locally tests make sure you route the stripe webhooks to your local machine. This will require getting the following keys from your stripe account:

1. Get the stripe secret and publuc key using the following instructions: https://docs.stripe.com/keys

2. Retrieve the local webhook signing secret (endpointSecret) from https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local 

3. Update the Stripe secrets foor your Stripe account on your local machine using the following cmds:

`dotnet user-secrets set "StripeSecretKey" "..." --project .\Projects\Stripe.Onboarding.App\Stripe.Onboarding.App.csproj`
`dotnet user-secrets set "StripePublicKey" "..." --project .\Projects\Stripe.Onboarding.App\Stripe.Onboarding.App.csproj`
`dotnet user-secrets set "StripeWebhookSecret" "..." --project .\Projects\Stripe.Onboarding.App\Stripe.Onboarding.App.csproj`

4. Follow the local webhook instructions for Stripe at: see: https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local on your machine

5. Test that you are receiving the webhooks within the command by performing a test transaction

## Solution overview

Sequence Diagram: https://static.swimlanes.io/11e0eb8a7422739f719510a80f5cef64.png

### Project setup
This solution is structured in a way to enable monolith applications that can be easily separated into separate macro, mini or micro services.

All projects are built under the namespace Stripe.Onboarding

#### Projects 
- Applications and services that share feature/foundation components
**1 Stripe.Onboarding.App**
- Currently the main project/bootstrap project for the website
- HomeController
-- Renders the ProductListing catalog

#### Features
- Shared domain logic, feature projects can inherit and use as many foundation projects as required, but never require each other.
**1. Stripe.Onboarding.Features.Cart**
- Contains all cart/checkout logic
- Inherits from Foundations.Common, Foundations.Integrations.Stripe, Foundations.Products, Foundations.Integrations.Authentication,

- CartController
-- Renders the Cart page showing the products in users cart and payment options

- CheckoutController
-- Renders the HostedPage, EmbeddedForm and CustomFlow pages
-- Contains the Embedded Form Postback logic

- CartSessionApiController
-- API endpoints fro adding/removing products to cart

- CartOrderApiController
-- API endpoints for updating the order and billing details for the CustomFlow 

**2. Stripe.Onboarding.Features.Payments**
- This is not currently used for anything except the PaymentWebhooksApi
- In time this project may be used for more lowlevel integration with stripe and non-checkout integrations and low level payment objects (Payment Intent, Charge integrations). 

- PaymentsController
-- Not used

- PaymentWebhookApiController
-- API endpoints for handling stripe webhooks

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

> How does the solution work? Which Stripe APIs does it use? How is your application architected?

**Stripe Checkout**
- This project only integrates with Stripe Checkout, providing users with the ability to checkout with the Hosted Page (redirect), Embedded Form (iFrame) or Custom Flow (integrated) checkout components.

## User flow
1. Add a new product to your cart, either one of the three books in our product range or a subscription to our book service
2. Checkout with your cart
*Note: If you have a subscription product in your cart, you cannot checkout with other items and vice versa*

## Problem state
> How did you approach this problem? Which docs did you use to complete the project? What challenges did you encounter?

I was originally going to build a uCommerce/Umbraco site to have a more traditional eCommerce site with built in OMS/catalog functionality. However I decided that most standard eCommerce platforms will typically have a Stripe module/integration pre-built that would handle most of the integration. Instead I wanted to built a bespoke solution that is more flexible to replicate potential unique usescases that a startup or larger business may have.

## Future state
> How you might extend this if you were building a more robust instance of the same application.

- Cleanup the logic/code base, and update the webhook handling to include better order/payment mgmt
- Separate our custom payment flows from stripe pages
- Implement some event-driven design (CQRS or something similar)
- Separate code from the cartcontroller into relevant projects

### TODOS
1. Update logic for payment methods to be consistent with cart > order > payment > payment handler > order updates
2. Payment Flow route methods to intercept updates (rather than landing on page and redirecting)
3. Country selector
4. Add billing/shipping details and other details (I.E List of invoices instead InvoicedAmount)
4. Bundled/Combined subscription/one-off charge payments (intent/charges integrations w/ sequential stepped payment form)
6. Improve the FE logic
7. Refactor the BE code
