using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.App.Models.View
{
    public class ProductListingPage : BasePage
    {
        public ProductListingPage(BasePage page)
        {
            this.TopNavigation = page.TopNavigation;
            this.UserId = page.UserId;
        }
        public List<ProductItem> Catalog { get; set; }
        public string CartPostbackUrl { get; set; }
    }
}
