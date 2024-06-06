using Stripe.Checkout;
using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Features.Cart.Hydrators
{
    public static class StripeHydrator
    {
        public static void HydrateSessionLineItem(this ProductItem data, SessionLineItemPriceDataOptions item)
        {
            if (data.IsStripeProduct)
            {
                item.Product = data.Id;
                item.UnitAmount = data.Amount;
                item.Currency = "NZD";
            }
            else
            {
                item.UnitAmount = data.Amount;
                item.Currency = "NZD";
                item.ProductData = new SessionLineItemPriceDataProductDataOptions()
                {
                    Description = data.Title,
                    Name = data.Title,
                };
            }
        }
    }
}
