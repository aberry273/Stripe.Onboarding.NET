using Stripe.Onboarding.Foundations.Common.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stripe.Onboarding.Foundations.Orders.Models.Data
{
    public enum OrderStatus
    {
        New, Paid, Fulfilled, Cancelled, Refunded
    }
    public class Order
    {
        public OrderStatus Status { get; set; } = OrderStatus.New;
        public string CustomerEmail { get; set; }
        public Guid UserId { get; set; }
        [NotMapped]
        public int Amount {
            get
            {
                if (this.Items == null || this.Items.Count == 0) return 0;
                return this.Items.Sum(x => x.Quantity * x.Product.Amount);
            }
        }
        public string PaymentReference { get; set; }
        public Guid Id { get; set; } = Guid.NewGuid();
        public List<OrderProductItem> Items { get; set; } = new List<OrderProductItem>();
    }
}
