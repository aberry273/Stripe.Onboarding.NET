using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Features.Cart.Services
{
    public class CartSessionService : ICartSessionService
    {
        public Dictionary<Guid, SessionCart> _cacheStore = new Dictionary<Guid, SessionCart>();

        public SessionCart GetCart(Guid userId)
        {
            var cart = (_cacheStore.ContainsKey(userId) ? _cacheStore[userId] : new SessionCart()) ?? new SessionCart();
            return cart;
        }
        public void AddToCart(Guid userId, ProductItem item, int quantity)
        {
            var cart = (_cacheStore.ContainsKey(userId) ? _cacheStore[userId] : new SessionCart()) ?? new SessionCart();
            cart.Items.Add(new SessionCartProductItem()
            {
                Product = item,
                Quantity = quantity
            });
        }
        
    }
}
