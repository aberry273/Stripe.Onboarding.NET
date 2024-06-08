namespace Stripe.Onboarding.Foundations.Orders.Models.Data
{
    public class BillingDetails
    {
        public Guid OrderId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
    }
}
