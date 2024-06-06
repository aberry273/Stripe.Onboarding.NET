using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Orders.Models.Data;

namespace Stripe.Onboarding.Foundations.Cart.Services
{
    public interface IOrderService
    {
        Order GetOrder(Guid orderId);
        void SaveOrder(Order order);
        Order CreateOrderFromCart(Guid userId, List<OrderProductItem> items);
    }
}
