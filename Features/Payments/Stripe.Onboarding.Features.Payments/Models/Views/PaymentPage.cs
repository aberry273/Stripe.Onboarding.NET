using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Common.Models.Components.Form;

namespace Stripe.Onboarding.Features.Payments.Models.Views
{
    public class PaymentPage : BasePage
    {
        public Form PaymentForm { get; set; }
    }
}
