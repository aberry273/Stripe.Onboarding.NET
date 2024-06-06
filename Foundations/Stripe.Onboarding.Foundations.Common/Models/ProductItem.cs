using Newtonsoft.Json;

namespace Stripe.Onboarding.Foundations.Common.Models
{
    public class ProductItem
    {
        public bool IsStripeProduct { get; set; } = false;
        public bool IsRecurring { get; set; } = false;
        public string Image { get; set; }
        public string Id { get; set; }
        public string Title { get; set; }
        public int Amount { get; set; }
    }
}
