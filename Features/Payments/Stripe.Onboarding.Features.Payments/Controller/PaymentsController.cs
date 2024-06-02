using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe.Onboarding.Features.Payments.Models.Views;
using Stripe.Onboarding.Features.Payments.Models.Data;
using Stripe.Onboarding.Foundations.Common.Models.Components.Form;

namespace Stripe.Onboarding.Features.Payments.Controllers
{
    public class PaymentsController : Controller
    {

        #region Payment
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Pay()
        {
            PaymentPage paymentModel = new PaymentPage();
            paymentModel.PaymentForm = this.CreatePaymentForm();
            return View(paymentModel);
        }
        public Form CreatePaymentForm()
        {
            var model = new Form()
            {
                Label = "Pay",
                Fields = new List<FormField>()
                {
                    new FormField()
                    {
                        Name = "UserId",
                        FieldType = FormFieldTypes.input,
                        Hidden = true,
                        Disabled = true,
                        AriaInvalid = false,
                    },
                }
            };
            return model;
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Pay(PaymentFormRequest model)
        {
            return View(model);
        }
        #endregion
    }
}
