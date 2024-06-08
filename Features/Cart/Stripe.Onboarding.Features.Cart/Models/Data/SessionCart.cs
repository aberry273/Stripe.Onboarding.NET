using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Features.Cart.Models.Data
{
    public class SessionCart
    {
        public string Currency { get; set; } = "nzd";
        public Guid Id { get; set; } = Guid.NewGuid();
        public List<SessionCartProductItem> Items { get; set; } = new List<SessionCartProductItem>();
    }
}
