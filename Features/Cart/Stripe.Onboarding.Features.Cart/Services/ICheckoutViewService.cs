using Stripe.Checkout;
using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Foundations.Orders.Models.Data;

namespace Stripe.Onboarding.Features.Cart.Services
{
    public interface ICheckoutViewService
    {
        SessionShippingAddressCollectionOptions CreateShippingAddressCollectionOptions();
        bool HasSubscriptionProduct(SessionCart cart);
        string GetPaymentMode(SessionCart cart);
        void ApplySubscriptionConsent(SessionCart cart, SessionCreateOptions options);
        SessionConsentCollectionOptions CreateSessionConsentCollectionOptions();
        SessionCustomTextOptions CreateSessionCustomTextOptions();
        SessionCreateOptions CreateHostedPageSessionOptions(SessionCart cart, Order order, string successUrl, string cancelUrl);
        SessionCreateOptions CreateEmbeddedFormSessionOptions(SessionCart cart, Order order, string returnUrl);
    }
}
