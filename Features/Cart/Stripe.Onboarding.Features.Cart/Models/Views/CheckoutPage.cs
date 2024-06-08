using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Common.Models.Components.Form;

namespace Stripe.Onboarding.Features.Cart.Models.Views
{
    public class CheckoutPage : BasePage
    {
        public CheckoutPage(BasePage page)
        {
            this.TopNavigation = page.TopNavigation;
            this.UserId = page.UserId;
        }
        public string CartPostbackUrl { get; set; }
        public string ReturnUrl { get; set; }
        public string PostbackUrl { get; set; }

        // Move to customflow specific page

        public string PublicKey { get; set; }
        public List<PaymentOption> PaymentOptions { get; set; }
        public SessionCart Cart { get; set; }
        public Form CartForm { get; set; }

        //result

        public string Status { get; set; }
        public string CustomerEmail { get; set; }
    }
}
