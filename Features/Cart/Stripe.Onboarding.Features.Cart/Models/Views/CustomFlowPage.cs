using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Features.Cart.Models.Views
{
    public class CustomFlowPage : CheckoutPage
    {
        public CustomFlowPage(BasePage page) : base(page)
        {
        }
        public string SuccessUrl { get; set; }
        public string OrderApiPostbackUrl { get; set; }
    }
}
