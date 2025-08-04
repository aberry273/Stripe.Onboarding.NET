using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stripe.Onboarding.Foundations.Common.Models
{
    public class BaseApiResponse<T>
    {
        public string Message { get; set; }
        public T Data { get; set; }
        public bool Success { get; set; }
    }
}
