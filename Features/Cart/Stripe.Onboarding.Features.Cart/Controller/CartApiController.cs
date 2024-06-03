using Microsoft.AspNetCore.Mvc;
using Stripe.Onboarding.Features.Cart.Controllers;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Services;

namespace Stripe.Onboarding.Features.Cart.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartApiController : ControllerBase
    {
        IStripeCheckoutService _stripeService { get; set; }
        public CartApiController(IStripeCheckoutService stripeService)
        {
            _stripeService = stripeService;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string session_id)
        { 
            var session = _stripeService.GetCheckoutSession(session_id);

            return Ok(new { status = session.RawJObject["status"], customer_email = session.RawJObject["customer_details"]["email"] });
        }

    }
}
