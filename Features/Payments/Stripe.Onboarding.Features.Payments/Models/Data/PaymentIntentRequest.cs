using Newtonsoft.Json;
using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Features.Payments.Models.Data
{
    public class PaymentIntentRequest
    {
        public Guid CartId { get; set; }
        public Guid OrderId { get; set; }
    }
}
