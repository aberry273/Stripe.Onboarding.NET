using Microsoft.AspNetCore.Mvc;
using Stripe.Onboarding.Features.Cart.Controllers;
using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Features.Cart.Services;
using Stripe.Onboarding.Features.Payments.Models.Data;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Services;
using Stripe.Onboarding.Foundations.Products.Services;

namespace Stripe.Onboarding.Features.Cart.Controller
{
    [Route("api/cartsession")]
    [ApiController]
    public class CartSessionApiController : ControllerBase
    {
        IStripeCheckoutService _stripeService { get; set; }
        ICartSessionService _cartSessionService { get; set; }
        IProductCatalogService _productCatalogService { get; set; }
        public CartSessionApiController(IStripeCheckoutService stripeService, ICartSessionService cartSessionService, IProductCatalogService productCatalogService)
        {
            _stripeService = stripeService;
            _cartSessionService = cartSessionService;
            _productCatalogService = productCatalogService;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string session_id)
        { 
            var session = _stripeService.GetCheckoutSession(session_id);

            return Ok(new { status = session.RawJObject["status"], customer_email = session.RawJObject["customer_details"]["email"] });
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToCart([FromBody] AddCartProductRequest request)
        {
            try
            {
                var product = _productCatalogService.GetProduct(request.ProductId);
                if(product == null)
                {
                    return NotFound(new { message = "There was a problem adding your product, please try again!" });
                }
                _cartSessionService.AddToCart(request.UserId, product, request.Quantity);
                return Ok(true);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = "There was a problem, please try again!" });
            }
        }

        [HttpDelete("clear/{userId}")]
        public async Task<IActionResult> Remove([FromRoute] Guid userId)
        {
            try
            {
                _cartSessionService.ClearCart(userId);
                
                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "There was a problem, please try again!" });
            }
        }
        [HttpGet("id")]
        public async Task<IActionResult> Cart([FromRoute] Guid id)
        {
            try
            {
                var cart = _cartSessionService.GetCart(id);
                if (cart == null)
                {
                    return NotFound(new { message = "There was a problem adding your product, please try again!" });
                }
                return Ok(cart);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "There was a problem, please try again!" });
            }
        }

    }
}
