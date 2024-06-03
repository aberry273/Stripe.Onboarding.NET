namespace Stripe.Onboarding.Features.Cart.Models.Data
{
    public class AddCartProductRequest
    {
        public Guid UserId { get; set; }
        public string ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
