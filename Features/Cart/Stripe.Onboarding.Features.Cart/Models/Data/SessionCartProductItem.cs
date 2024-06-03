using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Features.Cart.Models.Data
{
    public class SessionCartProductItem
    {
        public ProductItem Product { get; set; }
        public int Quantity { get; set; }
    }
}
