using Stripe.Checkout;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Models.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stripe.Onboarding.Foundations.Integrations.Stripe.Services
{
    public interface IStripeCheckoutService : IStripeService
    {
        Checkout.Session CreateSession(Checkout.SessionCreateOptions options);
        Checkout.Session GetCheckoutSession(string id);
        Checkout.Session GetCheckoutSession(string id, Checkout.SessionGetOptions options);
        SetupIntent GetSetupIntent(string id);

        public PaymentIntent? GetPaymentIntent(string paymentIntentId, PaymentIntentGetOptions options);
        PaymentIntent? GetPaymentIntent(string paymentIntentId);
        PaymentIntent? CreatePaymentIntent(int orderAmount, string currency);

        PaymentIntentGetOptions CustomerDetailsPaymentIntentOptions();
        SessionGetOptions CustomerDetailsSessionDetailsOptions();
    }
}
