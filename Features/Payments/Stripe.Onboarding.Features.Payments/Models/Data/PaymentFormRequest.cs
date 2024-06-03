using Newtonsoft.Json;
using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Features.Payments.Models.Data
{
    public class PaymentIntentRequest
    {
        [JsonProperty("items")]
        public List<ProductItem> Items { get; set; }
    }
}
