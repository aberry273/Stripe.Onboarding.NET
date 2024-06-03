using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;
using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Features.Cart.Models.Views;
using Stripe.Onboarding.Foundations.Common.Models.Components.Form;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Services;
using System.Threading.Channels;
using System.Web;

namespace Stripe.Onboarding.Features.Cart.Controllers
{
    public class CartController : Controller
    {
        IStripeCheckoutService _stripeService { get; set; }
        public CartController(IStripeCheckoutService stripeService)
        {
            _stripeService = stripeService;
        }

        #region Checkout
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Checkout()
        {
            CheckoutPage paymentModel = new CheckoutPage();
            paymentModel.CartForm = this.CreateCheckoutForm();
            return View(paymentModel);
        }
        public Form CreateCheckoutForm()
        {
            var model = new Form()
            {
                Label = "Submit",
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
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> CustomFlow()
        {
            CheckoutPage paymentModel = new CheckoutPage();
            paymentModel.CartForm = this.CreateCheckoutForm();
            return View(paymentModel);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> EmbeddedForm()
        {
            CheckoutPage paymentModel = new CheckoutPage();
            paymentModel.CartForm = this.CreateCheckoutForm();
            return View(paymentModel);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> HostedPage()
        {
            CheckoutPage paymentModel = new CheckoutPage();
            paymentModel.CartForm = this.CreateCheckoutForm();
            return View(paymentModel);
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CheckoutHostedPage(CartCheckoutRequest model)
        {
            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions()
                        {
                            UnitAmount = 100,
                            Currency = "NZD",
                            ProductData = new SessionLineItemPriceDataProductDataOptions()
                            {
                                Description = "Test purchase",
                                Name = "TestProduct",
                            }
                        },
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        //Price = "2000",
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                SuccessUrl = this.SuccessUrl("Success"),
                CancelUrl = this.SuccessUrl("Cancel"),
            };
            Session session = _stripeService.CreateSession(options);

            Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);
        }
        #endregion
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Success()
        {
            CheckoutPage paymentModel = new CheckoutPage();
        
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
            CheckoutPage paymentModel = new CheckoutPage();
         
            return View(paymentModel);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Error()
        {
            CheckoutPage paymentModel = new CheckoutPage(); 
            return View(paymentModel);
        }
    }
}
