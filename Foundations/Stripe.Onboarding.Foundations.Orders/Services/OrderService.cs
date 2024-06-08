using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Orders.Models.Data;

namespace Stripe.Onboarding.Foundations.Cart.Services
{
    public class OrderService : IOrderService
    {
        public static List<Order> _cacheStore;
        public OrderService()
        {
            _cacheStore = new List<Order>();
        }

        public Order CreateOrderFromCart(Guid userId, Guid cartId, List<OrderProductItem> items)
        {
           return new Order()
            {
                Id = Guid.NewGuid(),
                Items = items,
                CartId = cartId,
                UserId = userId,
            };
        }
        public Order GetOrderFromCartId(Guid cardId)
        {
            return _cacheStore.FirstOrDefault(x => x.CartId == cardId);
        }
        public Order GetOrder(Guid orderId)
        {
            return _cacheStore.FirstOrDefault(x => x.Id == orderId);
        }

        public void SaveOrder(Order order)
        {
            var index = _cacheStore.IndexOf(order);
            if(index == -1)
            {
                _cacheStore.Add(order);
            }
            else
            {
                _cacheStore[index] = order;
            }
        } 
    }
}
