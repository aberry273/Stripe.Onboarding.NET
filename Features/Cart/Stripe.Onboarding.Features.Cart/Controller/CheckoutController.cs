using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;
using Stripe.Onboarding.Features.Cart.Helpers;
using Stripe.Onboarding.Features.Cart.Hydrators;
using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Features.Cart.Models.Views;
using Stripe.Onboarding.Features.Cart.Services;
using Stripe.Onboarding.Foundations.Authentication.Services;
using Stripe.Onboarding.Foundations.Cart.Services;
using Stripe.Onboarding.Foundations.Common.Controllers;
using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Common.Models.Components.Form;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Services;
using Stripe.Onboarding.Foundations.Orders.Models.Data;
using System.Threading.Channels;
using System.Web;

namespace Stripe.Onboarding.Features.Cart.Controllers
{
    public class CheckoutController : BaseController
    {
        IStripeCheckoutService _stripeService { get; set; }
        ICartSessionService _cartSessionService { get; set; }
        IOrderService _orderService { get; set; }
        public CheckoutController(
            IStripeCheckoutService stripeService,
            ICartSessionService cartSessionService,
            IOrderService orderService,
            IMockAuthenticationService authService) : base(authService)
        {
            _stripeService = stripeService;
            _orderService = orderService;
            _cartSessionService = cartSessionService;
        }

        #region Checkout
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
            CheckoutPage paymentModel = new CheckoutPage(this.CreateBaseContent());
            paymentModel.Cart = _cartSessionService.GetCart(this.GetSessionUser());
            paymentModel.CartItems = paymentModel.Cart.Items?.Count() ?? 0;
            if(paymentModel.CartItems == 0)
            {
                return RedirectToAction("Checkout", "Cart");
            }
            paymentModel.ReturnUrl = this.CustomFlowUrl();
            paymentModel.PublicKey = _stripeService.Config.PublicKey;
            paymentModel.PostbackUrl = "/api/cartsession/paymentintent";
            paymentModel.CartForm = this.CreateCheckoutForm();
            return View(paymentModel);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> EmbeddedForm()
        {
            CheckoutPage paymentModel = new CheckoutPage(this.CreateBaseContent());
            paymentModel.Cart = _cartSessionService.GetCart(this.GetSessionUser());
            paymentModel.CartItems = paymentModel.Cart.Items?.Count() ?? 0;
            if (paymentModel.CartItems == 0)
            {
                return RedirectToAction("Checkout", "Cart");
            }
            paymentModel.PostbackUrl = this.SessionFormUrl();
            paymentModel.PublicKey = _stripeService.Config.PublicKey;
            paymentModel.CartForm = this.CreateCheckoutForm();
            return View(paymentModel);
        }
        public Order CreateOrderFromCart(Guid userId, SessionCart cart)
        {
            //Create order
            var orderItems = cart.Items.Select(OrderHelper.CreateOrderProductItem).ToList();
            var order = _orderService.CreateOrderFromCart(userId, orderItems);
            return order;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> HostedPage()
        {
            var userId = this.GetSessionUser();
            var cart = _cartSessionService.GetCart(userId);
            if (cart.Items.Count() == 0)
            {
                return RedirectToAction("Checkout", "Cart");
            }
            //Create order
            var order = CreateOrderFromCart(userId, cart);

            var options = new SessionCreateOptions
            {
                LineItems = cart.Items.Select(StripeHelper.CreateLineItemData).ToList(),
                Mode = "payment",
                SuccessUrl = this.SuccessRedirectUrl(order.Id.ToString()),
                CancelUrl = this.CancelUrl("Cancel"),
                ClientReferenceId = order.Id.ToString(),
            };
            Session session = _stripeService.CreateSession(options);

            _orderService.SaveOrder(order);

            Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);
        }

        //https://docs.stripe.com/checkout/embedded/quickstart
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateEmbeddedFormSession()
        {
            var userId = this.GetSessionUser();
            var cart = _cartSessionService.GetCart(userId);
            var options = new SessionCreateOptions
            {
                LineItems = cart.Items.Select(StripeHelper.CreateLineItemData).ToList(),
                UiMode = "embedded",
                ShippingAddressCollection = new SessionShippingAddressCollectionOptions
                {
                    AllowedCountries = new List<string>
                    {
                        "NZ",
                        "AU"
                    },
                },
                Mode = "payment",
                ReturnUrl = this.ReturnUrl()+ "?session_id={CHECKOUT_SESSION_ID}",
            };
            Session session = _stripeService.CreateSession(options);
            var order = CreateOrderFromCart(userId, cart);

            return Ok(new { clientSecret = session.RawJObject["client_secret"] });
        }
        #endregion


        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> SuccessRedirect()
        {
            ConfirmationPage paymentModel = new ConfirmationPage(this.CreateBaseContent());
            var request = HttpContext.Request;
            var oid = request.Query["oid"];
            Guid orderId;
            Guid.TryParse(oid, out orderId);
            //TODO: Replace with order in the future 
            var order = _orderService.GetOrder(orderId);
            if(order == null)
            {
                return RedirectToAction("Error");
            }
            paymentModel.PaymentMethodReference = order.PaymentReference;
            paymentModel.OrderAmount = order.Amount; 
            paymentModel.Status = "success";
            return View(paymentModel);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Success([FromQuery] string session_id)
        {
            ConfirmationPage paymentModel = new ConfirmationPage(this.CreateBaseContent());
            var options = new SessionGetOptions();
            options.AddExpand("customer");
            options.AddExpand("line_items");
            var session = _stripeService.GetCheckoutSession(session_id);
            paymentModel.Status = session.Status;
            paymentModel.CustomerEmail = session.CustomerEmail;
            paymentModel.PaymentMethodReference = session.PaymentIntentId;
            return View(paymentModel);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Cancel()
        {
            CheckoutPage paymentModel = new CheckoutPage(this.CreateBaseContent());
         
            return View(paymentModel);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Error()
        {
            CheckoutPage paymentModel = new CheckoutPage(this.CreateBaseContent()); 
            return View(paymentModel);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Return([FromQuery] string session_id)
        {
            CheckoutPage paymentModel = new CheckoutPage(this.CreateBaseContent());

            return View(paymentModel);
        }


        #region Urls

        public string SuccessUrl(string message)
        {
            return this.GetRouteUrl(nameof(Success), "Checkout", message);
        }
        public string SuccessRedirectUrl(string oid)
        {
            return this.GetRouteOrderUrl(nameof(SuccessRedirect), "Checkout", oid);
        }
        public string CancelUrl(string message)
        {
            return this.GetRouteUrl(nameof(Cancel), "Checkout", message);
        }
        public string ReturnUrl()
        {
            return this.GetRouteUrl(nameof(Success), "Checkout");
        }
        public string CartReturnUrl()
        {
            return this.GetRouteUrl(nameof(Success), "Checkout");
        }
        public string SessionFormUrl()
        {
            return this.GetRouteUrl(nameof(CreateEmbeddedFormSession), "Checkout");
        }
        public string CustomFlowUrl()
        {
            return this.GetRouteUrl(nameof(CustomFlow), "Checkout");
        }

        private string GetRouteUrl(string action, string controller, string? message = null)
        {
            return this.Url.Action(
                action: action,
                controller: controller,
                values: new { message },
                protocol: Request.Scheme);
        }
        private string GetRouteOrderUrl(string action, string controller, string? oid = null)
        {
            return this.Url.Action(
                action: action,
                controller: controller,
                values: new { oid },
                protocol: Request.Scheme);
        }
        #endregion
    }
}
