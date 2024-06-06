using Newtonsoft.Json;
using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Features.Cart.Models.Data
{
    public class PaymentIntentRequest
    {
        //Should just use UserId but would likely use a cartId
        public Guid CartId { get; set; }
    }
}
