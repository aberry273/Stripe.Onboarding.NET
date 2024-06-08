using Microsoft.AspNetCore.Mvc;
using Stripe.Onboarding.Features.Cart.Controllers;
using Stripe.Onboarding.Features.Cart.Helpers;
using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Features.Cart.Services;
using Stripe.Onboarding.Features.Payments.Models.Data;
using Stripe.Onboarding.Foundations.Cart.Services;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Services;
using Stripe.Onboarding.Foundations.Orders.Models.Data;
using Stripe.Onboarding.Foundations.Products.Services;

namespace Stripe.Onboarding.Features.Cart.Controller
{
    [Route("api/checkoutorder")]
    [ApiController]
    public class CheckoutOrderApiController : ControllerBase
    {
        IOrderService _orderService { get; set; }
        IStripeCheckoutService _stripeService { get; set; }
        ICartSessionService _cartSessionService { get; set; }
        IProductCatalogService _productCatalogService { get; set; }
        public CheckoutOrderApiController(IStripeCheckoutService stripeService, ICartSessionService cartSessionService, IProductCatalogService productCatalogService, IOrderService orderService)
        {
            _orderService = orderService;
            _stripeService = stripeService;
            _cartSessionService = cartSessionService;
            _productCatalogService = productCatalogService;
        } 
        [HttpPost("billing")]
        public async Task<IActionResult> SetBillingDetails([FromBody] BillingDetails request)
        {
            try
            {
                // Set the billing details
                var order = _orderService.GetOrder(request.OrderId);
                order.CustomerBilling = request;

                _orderService.SaveOrder(order);
                return Ok(request);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "There was a problem, please try again!" });
            }
        }
        public async Task<IActionResult> UpdateOrder([FromBody] UpdateOrderRequest request)
        {
            try
            {
                var order = _orderService.GetOrder(request.OrderId);
                if(order == null)
                {
                    return NotFound(new { message = "There was a problem with your order, please contact support!" });
                }
                var paymentIntent = _stripeService.GetPaymentIntent(request.PaymentIntentId);
                if (paymentIntent == null)
                {
                    return NotFound(new { message = "There was a problem with your payment, please contact support!" });
                }
                // Redundant with the webhook implementation..
                order.PaymentReference = request.PaymentIntentId;
                order.InvoicedAmount = ((int)(paymentIntent.Amount / 100));
                _orderService.SaveOrder(order);

                return Ok(order);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = "There was a problem, please try again!" });
            }
        }
        [HttpPost("paymentintent")]
        public ActionResult PaymentIntent(PaymentIntentRequest request)
        {
            var cart = _cartSessionService.GetCartByCartId(request.CartId);
            var order = _orderService.GetOrder(request.OrderId);
            var orderAmount = cart.Items.Sum(x => x.Quantity * (x.Product.Amount * 100));
            var paymentIntent = _stripeService.CreatePaymentIntent(orderAmount, cart.Currency);
            return Ok(new { clientSecret = paymentIntent.ClientSecret });
        }
    }
}
