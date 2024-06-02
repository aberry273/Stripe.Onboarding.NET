using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe.Onboarding.Features.Payments.Models.Views;
using Stripe.Onboarding.Features.Payments.Models.Data;

namespace Stripe.Onboarding.Features.Payments.Controllers
{
    public class PaymentsController : Controller
    {
       
        #region Payment
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Pay()
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
            PaymentPage paymentModel = new PaymentPage();
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
        public async Task<IActionResult> Pay(PaymentForm model)
        {
            return View(model);
        }
        #endregion
    }
}
