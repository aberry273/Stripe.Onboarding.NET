using Stripe.Onboarding.Foundations.Common.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stripe.Onboarding.Foundations.Orders.Models.Data
{
    public enum OrderStatus
    {
        New, WaitingPayment, Paid, Fulfilled, Cancelled, Refunded
    }
    public class Order
    {
        public BillingDetails CustomerBilling { get; set; } = new BillingDetails();
        public OrderStatus Status { get; set; } = OrderStatus.New;
        public string CustomerEmail
        {
            get
            {
                return CustomerBilling.Email;
            }
        }
        public Guid UserId { get; set; }
        [NotMapped]
        public int Amount {
            get
            {
                if (this.Items == null || this.Items.Count == 0) return 0;
                return this.Items.Sum(x => x.Quantity * x.Product.Amount);
            }
        }
        
        public int InvoicedAmount { get; set; }
        public string PaymentReference { get; set; }
        public Guid CartId { get; set; }
        public Guid Id { get; set; }
        public List<OrderProductItem> Items { get; set; } = new List<OrderProductItem>();
    }
}
