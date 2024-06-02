
namespace Stripe.Onboarding.Foundations.Common.Models
{

    public class BasePage
    {
        public List<NavigationItem> TopNavigation { get; set; }
        public List<ProductItem> Catalog { get; set; }
        public BasePage() { }
    }
}
