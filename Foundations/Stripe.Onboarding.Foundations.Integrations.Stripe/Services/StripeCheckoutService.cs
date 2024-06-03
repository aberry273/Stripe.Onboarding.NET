using Microsoft.Extensions.Options;
using Stripe.Checkout;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Models.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stripe.Onboarding.Foundations.Integrations.Stripe.Services
{
    public class StripeCheckoutService : IStripeCheckoutService
    {
        StripeConfig _config { get; set; }
        IStripeClient _stripeClient { get; set; }
        SessionService _checkoutSessionService { get; set; }
        SetupIntentService _setupIntentService { get; set; }
        public StripeCheckoutService(IOptions<StripeConfig> options)
        {
            _config = options.Value;
             
            _stripeClient = new StripeClient(_config.SecretKey);

            _checkoutSessionService = new SessionService(_stripeClient);
            _setupIntentService = new SetupIntentService(_stripeClient);
        }
        public StripeConfig Config
        {
            get
            {
                return _config;
            }
        }
        public Session CreateSession(SessionCreateOptions options)
        {
            return _checkoutSessionService.Create(options);
        }
        public Session GetCheckoutSession(string id)
        {
            SessionGetOptions options = new SessionGetOptions()
            {
            };
            return _checkoutSessionService.Get(id);
        }
        public SetupIntent GetSetupIntent(string id)
        {
            return _setupIntentService.Get(id);
        }
    }
}
