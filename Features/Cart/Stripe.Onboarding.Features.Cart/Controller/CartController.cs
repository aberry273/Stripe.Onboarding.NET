using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Stripe.Onboarding.Features.Cart.Models.Data;
using Stripe.Onboarding.Features.Cart.Models.Views;
using System.Web;

namespace Stripe.Onboarding.Features.Cart.Controllers
{
    public class CartController : Controller
    {
       
        #region Payment
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Checkout()
        {
            /*
            var viewModel = _accountViewService.GetResetPasswordPage(userId, code);

            if (userId == null)
            {
                viewModel.Form.Response = "There was an error with the link that was supplied. ";
            }

            if (code == null)
            {
                viewModel.Form.Response += "A code must be supplied for password reset.";
            }
            */
            CheckoutPage paymentModel = new CheckoutPage();
            return View(paymentModel);
        }
        /*
        public string ResetPasswordCallbackLink(string userId, string code, string scheme)
        {
            return this.Url.Action(
                action: nameof(ResetPassword),
                controller: ControllerHelper.NameOf<AccountController>(),
                values: new { userId, code },
                protocol: scheme);
        }
        */
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Checkout(CartForm model)
        {
            return View(model);
        }
        #endregion
    }
}
