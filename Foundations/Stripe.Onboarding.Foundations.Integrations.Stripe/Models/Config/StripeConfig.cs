using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stripe.Onboarding.Foundations.Integrations.Stripe.Models.Config
{
    public class StripeConfig
    {
        public string WebhookSecret { get; set; }
        public string SecretKey { get; set; }
        public string PublicKey { get; set; }
    }
}
