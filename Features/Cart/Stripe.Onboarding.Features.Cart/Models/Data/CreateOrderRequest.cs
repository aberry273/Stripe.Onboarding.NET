namespace Stripe.Onboarding.Features.Cart.Models.Data
{
    public class CreateOrderRequest
    {
        public Guid UserId { get; set; }
        public Guid CartId { get; set; }
        public string PaymentIntentId { get; set; }
    }
}
