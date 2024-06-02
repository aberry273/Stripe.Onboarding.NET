using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stripe.Onboarding.Foundations.Common.Models
{
    public class Cart
    {
        public List<ProductItem> Items { get; set; } = new List<ProductItem>();
    }
}
