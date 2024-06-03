
namespace Stripe.Onboarding.Foundations.Common.Models
{

    public class BasePage
    {
        public Guid UserId { get; set; }
        public List<NavigationItem> TopNavigation { get; set; }
        public BasePage() { }
    }
}
