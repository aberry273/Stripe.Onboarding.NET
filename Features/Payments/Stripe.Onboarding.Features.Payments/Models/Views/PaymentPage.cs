using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Common.Models.Components.Form;

namespace Stripe.Onboarding.Features.Payments.Models.Views
{
    public class PaymentPage : BasePage
    {
        public string Status { get; set; }
        public string CustomerEmail { get; set; }
        public Form PaymentForm { get; set; }
    }
}
