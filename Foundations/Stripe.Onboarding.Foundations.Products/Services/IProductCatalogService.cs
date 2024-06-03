using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Foundations.Products.Services
{
    public interface IProductCatalogService
    {
        public List<ProductItem> GetCatalog();
        public ProductItem GetProduct(string productId);
    }
}
