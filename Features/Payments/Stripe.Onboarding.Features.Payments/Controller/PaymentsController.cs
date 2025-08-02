using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe.Onboarding.Features.Payments.Models.Views;
using Stripe.Onboarding.Features.Payments.Models.Data;
using Stripe.Onboarding.Foundations.Common.Models.Components.Form;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.Extensions.Options;
using static Stripe.Onboarding.Foundations.Common.Constants;
using Stripe;
using Stripe.Checkout;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Services;
using Stripe.Onboarding.Foundations.Common.Controllers;
using Stripe.Onboarding.Foundations.Authentication.Services;

namespace Stripe.Onboarding.Features.Payments.Controllers
{
    public class PaymentsController : BaseController
    {
        public IStripeCheckoutService _stripeService { get; set; }
        public string Domain { get; set; }
        public PaymentsController(
            IConfiguration configuration,
            IMockAuthenticationService authService,
            IStripeCheckoutService stripeService) : base(authService)
        {
            this.Domain = configuration[Foundations.Common.Constants.Settings.DomainKey];
            _stripeService = stripeService;
        }


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
        public async Task<IActionResult> Pay(PaymentIntentRequest model)
        { 
            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    Price = "{{PRICE_ID}}",
                    Quantity = 1,
                  },
                },
                Mode = "payment",
                SuccessUrl = this.SuccessUrl("Success"),
                CancelUrl = this.SuccessUrl("Cancel"),
            };
            var service = new SessionService();
            Session session = service.Create(options);

            Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);
        }
        #endregion


        #region
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Success([FromQuery] string session_id)
        {
            PaymentPage paymentModel = new PaymentPage();

            var session = _stripeService.GetCheckoutSession(session_id);
            paymentModel.Status = session.Status;
            paymentModel.CustomerEmail = session.CustomerEmail;
            paymentModel.PaymentForm = this.CreatePaymentForm();
            return View(paymentModel);
        }
        public string SuccessUrl(string message)
        {
            return this.Url.Action(
                action: nameof(Success),
                controller: "Payments",
                values: new { message },
                protocol: Request.Scheme);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Cancel()
        {
            PaymentPage paymentModel = new PaymentPage();
            paymentModel.PaymentForm = this.CreatePaymentForm();
            return View(paymentModel);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Error()
        {
            PaymentPage paymentModel = new PaymentPage();
            paymentModel.PaymentForm = this.CreatePaymentForm();
            return View(paymentModel);
        }
        #endregion
    }
}