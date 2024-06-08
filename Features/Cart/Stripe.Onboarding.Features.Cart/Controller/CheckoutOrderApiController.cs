using Microsoft.AspNetCore.Mvc;
using Stripe.Onboarding.Features.Cart.Controllers;
using Stripe.Onboarding.Features.Cart.Helpers;
using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Features.Cart.Services;
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
        // Move to shared service
        private Order CreateOrderFromCart(Guid userId, SessionCart cart)
        {
            //Create order
            var orderItems = cart.Items.Select(OrderHelper.CreateOrderProductItem).ToList();
            var order = _orderService.CreateOrderFromCart(userId, orderItems);
            return order;
        }
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            try
            {
                var cart = _cartSessionService.GetCartByCartId(request.CartId);
                if(cart == null)
                {
                    return NotFound(new { message = "There was a problem with your order, please contact support!" });
                }
                var paymentIntent = _stripeService.GetPaymentIntent(request.PaymentIntentId);
                if (paymentIntent == null)
                {
                    return NotFound(new { message = "There was a problem with your payment, please contact support!" });
                }
                //TODO: Check user - if user service exists

                var order = CreateOrderFromCart(request.UserId, cart);
                // Redundant with the webhook implementation..
                order.PaymentReference = request.PaymentIntentId;
                _orderService.SaveOrder(order);

                return Ok(order);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = "There was a problem, please try again!" });
            }
        }
    }
}
