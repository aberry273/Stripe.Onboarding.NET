using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stripe.Onboarding.Foundations.Common.Models.Components.Form
{
    public enum PostbackType
    {
        GET, POST, PUT, DELETE
    }
    public class AjaxForm : Form
    {
        public required PostbackType Type { get; set; }
        public string PostbackType => Enum.GetName(Type);
        public required string PostbackUrl { get; set; }
        public string Event { get; set; }
        public string ActionEvent { get; set; }
    }
}
