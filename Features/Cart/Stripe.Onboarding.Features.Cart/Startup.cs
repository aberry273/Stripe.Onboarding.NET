using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Stripe.Onboarding.Features.Cart.Services;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Models.Config;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Services;

namespace Stripe.Onboarding.Features.Cart
{
    public static class Startup
    {
        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            // SERVICES
            services.AddSingleton<ICartSessionService, CartSessionService>();
            services.AddTransient<ICheckoutViewService, CheckoutViewService>();
        }
    }
}
