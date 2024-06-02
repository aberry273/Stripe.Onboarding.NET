
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Evaluation;
using Stripe.Onboarding.Foundations.Common.Models;

namespace Stripe.Onboarding.App.Controllers
{
    //[Authorize]
    public class HomeController : BaseController
    {
        public HomeController() : base()
        {
        }
        private BasePage CreateBaseContent()
        { 
            var model = new BasePage();
            model.TopNavigation = new List<NavigationItem>()
            {
                new NavigationItem()
                {
                    Disabled = false,
                    Href = "/Cart/Checkout",
                    Text = "Cart"
                },
            };
            model.Catalog = new List<ProductItem>()
            {
                new ProductItem() {
                    Image = "https://placehold.co/600x400",
                    Id = Guid.NewGuid().ToString(),
                    Title = "The Art of Doing Science and Engineering",
                    Amount = 2300
                },
                new ProductItem() {
                    Image = "https://placehold.co/600x400",
                    Id = Guid.NewGuid().ToString(),
                    Title = "The Making of Prince of Persia: Journals 1985-1993",
                    Amount = 2500
                },
                new ProductItem() {
                    Image = "https://placehold.co/600x400",
                    Id = Guid.NewGuid().ToString(),
                    Title = "Working in Public: The Making and Maintenance of Open Source",
                    Amount = 2800
                },
            };
            return model;
        }
        public IActionResult Index()
        {
            var model = this.CreateBaseContent();
            return View(model);
        }

    }
}
