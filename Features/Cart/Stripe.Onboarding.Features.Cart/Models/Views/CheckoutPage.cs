using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Common.Models.Components.Form;

namespace Stripe.Onboarding.Features.Cart.Models.Views
{
    public class CheckoutPage : BasePage
    {
        public string PostbackUrl { get; set; }
        public string PublicKey { get; set; }
        public Form CartForm { get; set; }
    }
}
