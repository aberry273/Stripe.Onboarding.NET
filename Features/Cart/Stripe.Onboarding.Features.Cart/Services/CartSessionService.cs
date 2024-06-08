using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Features.Cart.Services
{
    public class CartSessionService : ICartSessionService
    {
        public static Dictionary<Guid, SessionCart> _cacheStore;
        public CartSessionService()
        {
            _cacheStore = new Dictionary<Guid, SessionCart>();
        }
        
        public void SetCart(Guid userId, SessionCart cart)
        {
            if(_cacheStore.ContainsKey(userId))
            {
                _cacheStore[userId] = cart;
                return;
            }
            _cacheStore.Add(userId, cart);
        } 
        public SessionCart GetCart(Guid userId)
        {
            var cart = (_cacheStore.ContainsKey(userId) ? _cacheStore[userId] : new SessionCart()) ?? new SessionCart();
            return cart;
        }
        public SessionCart GetCartByCartId(Guid cartId)
        {
            return _cacheStore.Values.FirstOrDefault(x => x.Id == cartId);
        }
        public void AddToCart(Guid userId, ProductItem item, int quantity)
        {
            var cart = (_cacheStore.ContainsKey(userId) ? _cacheStore[userId] : new SessionCart()) ?? new SessionCart();
            cart.Items.Add(new SessionCartProductItem()
            {
                Product = item,
                Quantity = quantity
            });
            SetCart(userId, cart);
        }
        public void RemoveFromCart(Guid userId, ProductItem item, int quantity)
        {
            var cart = (_cacheStore.ContainsKey(userId) ? _cacheStore[userId] : new SessionCart()) ?? new SessionCart();
            var sessionCartItem = cart.Items.FirstOrDefault(x => x.Product.Id == item.Id);
            cart.Items.Remove(sessionCartItem);
            SetCart(userId, cart);
        }

        public void ClearCart(Guid userId)
        {
            _cacheStore.Remove(userId);
        }

    }
}
