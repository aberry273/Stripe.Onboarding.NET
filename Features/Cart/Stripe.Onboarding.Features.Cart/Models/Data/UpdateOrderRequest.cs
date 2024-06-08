using Stripe.Onboarding.Foundations.Orders.Models.Data;

namespace Stripe.Onboarding.Features.Cart.Models.Data
{
    public class UpdateOrderRequest
    {
        public Guid UserId { get; set; }
        public Guid OrderId { get; set; }
        public string PaymentIntentId { get; set; }
    }
}
