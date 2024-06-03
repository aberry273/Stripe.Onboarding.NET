using Stripe.Onboarding.Foundations.Integrations.Stripe.Models.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stripe.Onboarding.Foundations.Integrations.Stripe.Services
{
    public interface IStripeCheckoutService
    {
        StripeConfig Config { get; }
        Checkout.Session CreateSession(Checkout.SessionCreateOptions options);
        Checkout.Session GetCheckoutSession(string id);
        SetupIntent GetSetupIntent(string id);
    }
}
