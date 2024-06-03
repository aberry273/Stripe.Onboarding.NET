
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Evaluation;
using Stripe.Onboarding.App.Models.View;
using Stripe.Onboarding.Foundations.Authentication.Services;
using Stripe.Onboarding.Foundations.Common.Controllers;
using Stripe.Onboarding.Foundations.Common.Models;
using Stripe.Onboarding.Foundations.Products.Services;

namespace Stripe.Onboarding.App.Controllers
{
    //[Authorize]
    public class HomeController : BaseController
    {
        IProductCatalogService _productCatalogService;
        public HomeController(IMockAuthenticationService authService, IProductCatalogService productCatalogService) : base(authService)
        {
            _productCatalogService = productCatalogService;
        }


        private BasePage CreateProductListingPage()
        { 
            var model = new ProductListingPage(this.CreateBaseContent());
            model.Catalog = _productCatalogService.GetCatalog();
            model.CartPostbackUrl = "/api/cartsession";
            return model;
        }
        public IActionResult Index()
        {
            var model = this.CreateProductListingPage();
            return View(model);
        }

    }
}
