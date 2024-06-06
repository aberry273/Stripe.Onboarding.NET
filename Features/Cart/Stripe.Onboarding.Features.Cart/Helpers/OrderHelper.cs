using Stripe.Checkout;
using Stripe.Onboarding.Features.Cart.Hydrators;
using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Orders.Models.Data;

namespace Stripe.Onboarding.Features.Cart.Helpers
{
    public static class OrderHelper
    {
        public static OrderProductItem CreateOrderProductItem(SessionCartProductItem item)
        {
            var model = new OrderProductItem();
            item.HydrateOrderLineItem(model);
            return model;
        }
    }
}
