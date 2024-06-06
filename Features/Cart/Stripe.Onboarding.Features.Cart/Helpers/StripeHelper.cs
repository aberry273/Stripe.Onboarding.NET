using Stripe.Checkout;
using Stripe.Onboarding.Features.Cart.Hydrators;
using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Features.Cart.Helpers
{
    public static class StripeHelper
    {
        public static SessionLineItemOptions CreateLineItemData(SessionCartProductItem item)
        {
            var model = new SessionLineItemOptions();
            model.PriceData = CreateLineItemDataOptions(item.Product);
            model.Quantity = item.Quantity;
            return model;
        }

        public static SessionLineItemPriceDataOptions CreateLineItemDataOptions(ProductItem item)
        {
            var model = new SessionLineItemPriceDataOptions();
            item.HydrateSessionLineItem(model);
            return model;
        }
    }
}
