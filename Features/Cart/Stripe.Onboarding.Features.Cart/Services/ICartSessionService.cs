using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Features.Cart.Services
{
    public interface ICartSessionService
    {
        void ClearCart(Guid userId);
        SessionCart GetCart(Guid userId);
        SessionCart GetCartByCartId(Guid cartId);
        void AddToCart(Guid userId, ProductItem item, int quantity);
        void RemoveFromCart(Guid userId, ProductItem item, int quantity);
    }
}
