﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stripe.Onboarding.Foundations.Integrations.Stripe
{
    public struct Constants
    {
        public struct Settings
        {
            public const string StripeApiVersion = "2024-04-1";
            public const string ConfigName = "StripeConfiguration";
            public const string SecretKey = "StripeSecretKey";
            public const string PublicKey = "StripePublicKey";
            public const string WebhookSecret = "StripeWebhookSecret";
        }
    }
}
