using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Common.Models.Components.Form;

namespace Stripe.Onboarding.Features.Cart.Models.Views
{
    public class ConfirmationPage : BasePage
    {
        public ConfirmationPage(BasePage page)
        {
            this.TopNavigation = page.TopNavigation;
            this.UserId = page.UserId;
        }
        public string OrderId { get; set; }
        public int InvoiceAmount { get; set; }
        public int OrderAmount { get; set; }
        public string? PaymentMethodReference { get; set; }
        //result

        public string? Status { get; set; }
        public string? CustomerEmail { get; set; }
    }
}
