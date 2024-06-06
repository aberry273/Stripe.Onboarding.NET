using Stripe.Checkout;
using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Orders.Models.Data;

namespace Stripe.Onboarding.Features.Cart.Hydrators
{
    public static class OrderHydrator
    {
        public static void HydrateOrderLineItem(this SessionCartProductItem data, OrderProductItem item)
        {
            item.Quantity = data.Quantity;
            item.Product = data.Product;
        }
    }
}
