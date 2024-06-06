using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Foundations.Orders.Models.Data
{
    public class OrderProductItem
    {
        public ProductItem Product { get; set; }
        public int Quantity { get; set; }
    }
}
