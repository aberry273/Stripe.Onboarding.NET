using Stripe.Checkout;
using Stripe.Onboarding.Features.Cart.Helpers;
using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Features.Cart.Models.Views;
using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Services;
using Stripe.Onboarding.Foundations.Orders.Models.Data;

namespace Stripe.Onboarding.Features.Cart.Services
{
    public class CheckoutViewService : ICheckoutViewService
    {
        public SessionCreateOptions CreateEmbeddedFormSessionOptions(SessionCart cart, Order order, string returnUrl)
        {
            var options = this.CreateSessionCreateOptions(cart, order, null, null, returnUrl);
            options.UiMode = "embedded";
            return options;
        }
        public SessionCreateOptions CreateHostedPageSessionOptions(SessionCart cart, Order order, string successUrl, string cancelUrl)
        {
            return this.CreateSessionCreateOptions(cart, order, successUrl, cancelUrl, null);
        }
        SessionCreateOptions CreateSessionCreateOptions(SessionCart cart, Order order, string? successUrl, string? cancelUrl, string? returnUrl)
        {
            return new SessionCreateOptions
            {
                LineItems = cart.Items.Select(StripeHelper.CreateLineItemData).ToList(),
                Mode = GetPaymentMode(cart),
                ShippingAddressCollection = CreateShippingAddressCollectionOptions(),
                CustomText = CreateSessionCustomTextOptions(),
                SuccessUrl = successUrl,
                CancelUrl = cancelUrl,
                ReturnUrl = returnUrl,
                ClientReferenceId = order.Id.ToString(),
            };
        }
        public SessionShippingAddressCollectionOptions CreateShippingAddressCollectionOptions()
        {
            return new SessionShippingAddressCollectionOptions
            {
                AllowedCountries = new List<string>
                    {
                        "NZ",
                    },
            };
        }

        public bool HasSubscriptionProduct(SessionCart cart)
        {
            if (cart == null) return false;
            return cart.Items.Any(x => x.Product.IsRecurring);
        }

        public string GetPaymentMode(SessionCart cart)
        {
            var hasSubscription = HasSubscriptionProduct(cart);
            return hasSubscription ? "subscription" : "payment";
        }
        public void ApplySubscriptionConsent(SessionCart cart, SessionCreateOptions options)
        {
            if (HasSubscriptionProduct(cart))
            {
                options.ConsentCollection = CreateSessionConsentCollectionOptions();
                options.CustomText.TermsOfServiceAcceptance = new Stripe.Checkout.SessionCustomTextTermsOfServiceAcceptanceOptions
                {
                    Message = "I agree to the [Terms of Service](https://example.com/terms)",
                };
            }
        }
        public SessionConsentCollectionOptions CreateSessionConsentCollectionOptions()
        {
            return new Stripe.Checkout.SessionConsentCollectionOptions
            {
                TermsOfService = "required",
            };
        }
        public SessionCustomTextOptions CreateSessionCustomTextOptions()
        {
            return new Stripe.Checkout.SessionCustomTextOptions
            {
                ShippingAddress = new Stripe.Checkout.SessionCustomTextShippingAddressOptions
                {
                    Message = "Please note that we can't guarantee 2-day delivery for PO boxes at this time.",
                },
                Submit = new Stripe.Checkout.SessionCustomTextSubmitOptions
                {
                    Message = "We'll email you instructions on how to get started.",
                },
                AfterSubmit = new Stripe.Checkout.SessionCustomTextAfterSubmitOptions
                {
                    Message = "Learn more about **your purchase** on our [product page](https://www.stripe.com/).",
                },
            };
        }
    }
}
