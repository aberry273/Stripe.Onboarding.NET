using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Features.Cart.Models.Data
{
    public class SessionCart
    {
        public List<SessionCartProductItem> Items { get; set; } = new List<SessionCartProductItem>();
    }
}
