using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Features.Cart.Models.Views;
using Stripe.Onboarding.Foundations.Common.Models.Components.Form;
using System.Threading.Channels;
using System.Web;

namespace Stripe.Onboarding.Features.Cart.Controllers
{
    public class CartController : Controller
    {
       
        #region Checkout
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Checkout()
        {
            CheckoutPage paymentModel = new CheckoutPage();
            paymentModel.CartForm = this.CreateCheckoutForm();
            return View(paymentModel);
        }
        public Form CreateCheckoutForm()
        {
            var model = new Form()
            {
                Label = "Submit",
                Fields = new List<FormField>()
                {
                    new FormField()
                    {
                        Name = "UserId",
                        FieldType = FormFieldTypes.input,
                        Hidden = true,
                        Disabled = true,
                        AriaInvalid = false,
                    },
                }
            };
            return model;
        }

        
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Checkout(CartCheckoutRequest model)
        {
            return RedirectToAction("Pay", "Payments");
        }
        #endregion
    }
}
