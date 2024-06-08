using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Common.Models.Components.Form;
using Stripe.Onboarding.Foundations.Orders.Models.Data;

namespace Stripe.Onboarding.Features.Cart.Models.Views
{
    public class CustomFlowPage : CheckoutPage
    {
        public CustomFlowPage(BasePage page) : base(page)
        {
        }
        public Order Order { get; set; }
        public AjaxForm PaymentForm { get; set; }
        public string SuccessUrl { get; set; }
        public string OrderApiPostbackUrl { get; set; }
        public Guid OrderId { get; set; }
    }
}
