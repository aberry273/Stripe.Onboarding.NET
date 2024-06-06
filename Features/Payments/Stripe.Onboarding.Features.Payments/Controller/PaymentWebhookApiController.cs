using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;
using Stripe.Onboarding.Features.Payments.Models.Data;
using Stripe.Onboarding.Foundations.Cart.Services;
using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Services;

namespace Stripe.Onboarding.Features.Payment.Controller
{
    /// <summary>
    /// Not used on localhost/dev
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentWebhookApiController : ControllerBase
    {
        IOrderService _orderService { get; set; }
        IStripeCheckoutService _stripeService { get; set; }
        public PaymentWebhookApiController(IStripeCheckoutService stripeService, IOrderService orderService)
        {
            _stripeService = stripeService;
            _orderService = orderService;
        }

        [HttpPost("stripe")]
        public async Task<IActionResult> Stripe()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = EventUtility.ConstructEvent(
                  json,
                  Request.Headers["Stripe-Signature"],
                  _stripeService.Config.WebhookSecret
                );
                Checkout.Session session = GetSession(stripeEvent);

                // Handle the checkout.session.completed event
                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    // Fulfill the purchase...
                    FulfillOrder(session);
                }
                
                switch (stripeEvent.Type)
                {
                    case Events.CheckoutSessionCompleted:

                        // Save an order in your database, marked as 'awaiting payment'
                        CreateOrder(session);

                        // Check if the order is paid (for example, from a card payment)
                        //
                        // A delayed notification payment will have an `unpaid` status, as
                        // you're still waiting for funds to be transferred from the customer's
                        // account.
                        var orderPaid = session.PaymentStatus == "paid";

                        if (orderPaid)
                        {
                            // Fulfill the purchase
                            FulfillOrder(session);
                        }

                        break;
                    case Events.CheckoutSessionAsyncPaymentSucceeded:
                        // Fulfill the purchase
                        FulfillOrder(session);

                        break;
                    case Events.CheckoutSessionAsyncPaymentFailed:
                        // Send an email to the customer asking them to retry their order
                        EmailCustomerAboutFailedPayment(session);
                        break;
                    case Events.PaymentIntentSucceeded:
                        // Send an email to the customer asking them to retry their order
                        UpdateOrderWithPaymentIntent(session);

                        break;
                }

                return Ok();
            }

            catch (StripeException e)
            {
                return BadRequest();
            }
        }
        private void UpdateOrderWithPaymentIntent(Checkout.Session session)
        {
            // TODO: fill me in
            // Retrieve the session. If you require line items in the response, you may include them by expanding line_items. 
            Guid orderId;
            Guid.TryParse(session.ClientReferenceId, out orderId);
            var order = _orderService.GetOrder(orderId);
            order.PaymentReference = session.PaymentIntentId;
            _orderService.SaveOrder(order);
        }
        private void FulfillOrder(Checkout.Session session)
        {
            // TODO: fill me in
            // Retrieve the session. If you require line items in the response, you may include them by expanding line_items. 
            Guid orderId;
            Guid.TryParse(session.ClientReferenceId, out orderId);
            var order = _orderService.GetOrder(orderId);
            StripeList<LineItem> lineItems = session.LineItems;
            order.Status = Foundations.Orders.Models.Data.OrderStatus.Paid;
            _orderService.SaveOrder(order);
        }

        private void CreateOrder(Checkout.Session session)
        {
            // TODO: fill me in
        }

        private void EmailCustomerAboutFailedPayment(Checkout.Session session)
        {
            // TODO: fill me in
        }

        private Checkout.Session GetSession(Event stripeEvent)
        {
            var session = stripeEvent.Data.Object as Checkout.Session;
            var options = new SessionGetOptions();
            options.AddExpand("line_items");

            // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
            return _stripeService.GetCheckoutSession(session.Id, options);
        }

    }
}
