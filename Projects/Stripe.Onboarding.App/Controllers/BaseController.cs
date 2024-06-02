using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Stripe.Onboarding.App.Controllers
{

    public abstract class BaseController : Controller
    {
        protected ClaimsPrincipal _identity => this.User;
        public BaseController()
        {
        }
    }
}
