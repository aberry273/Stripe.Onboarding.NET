﻿
using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.Foundations.Products.Services
{
    public class ProductCatalogService : IProductCatalogService
    {
        public List<ProductItem> _catalog { get; set; }
        public ProductCatalogService()
        {
            _catalog = CreateCatalog();
        }
        public List<ProductItem> CreateCatalog()
        {
            return new List<ProductItem>()
            {
                new ProductItem() {
                    Image = "https://placehold.co/600x400",
                    Id = Guid.NewGuid().ToString(),
                    Title = "The Art of Doing Science and Engineering",
                    Amount = 2300
                },
                new ProductItem() {
                    Image = "https://placehold.co/600x400",
                    Id = Guid.NewGuid().ToString(),
                    Title = "The Making of Prince of Persia: Journals 1985-1993",
                    Amount = 2500
                },
                new ProductItem() {
                    Image = "https://placehold.co/600x400",
                    Id = Guid.NewGuid().ToString(),
                    Title = "Working in Public: The Making and Maintenance of Open Source",
                    Amount = 2800
                },
            };
        }
        public List<ProductItem> GetCatalog()
        {
            return _catalog;
        }
        public ProductItem GetProduct(string productId)
        {
            return _catalog.FirstOrDefault(x => x.Id == productId);
        }
    }
}
