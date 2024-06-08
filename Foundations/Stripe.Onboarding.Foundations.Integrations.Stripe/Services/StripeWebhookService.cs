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
    public class StripeWebhookService : IStripeWebhookService
    {
        StripeConfig _config { get; set; }
        IStripeClient _stripeClient { get; set; }
        WebhookEndpointService _webhookEndpointService { get; set; }
        public StripeWebhookService(IOptions<StripeConfig> options)
        {
            _config = options.Value;
             
            _stripeClient = new StripeClient(_config.SecretKey);

            _webhookEndpointService = new WebhookEndpointService(_stripeClient);
        }
        public StripeConfig Config
        {
            get
            {
                return _config;
            }
        }
        private WebhookEndpointCreateOptions CreateLibraryEndpointOptions()
        {
            return new WebhookEndpointCreateOptions()
            {
                ApiVersion = Constants.Settings.StripeApiVersion,
                EnabledEvents = new List<String>() { "payment_intent.canceled", "payment_intent.created", "payment_intent.payment_failed", "payment_intent.requires_actions", "payment_intent.succeeded" },
                Url = "https://localhost:7230"
            };
        }
        
        public WebhookEndpoint? CreateWebhook(WebhookEndpointCreateOptions options)
        {
            return _webhookEndpointService.Create(options);
        }
    }
}
