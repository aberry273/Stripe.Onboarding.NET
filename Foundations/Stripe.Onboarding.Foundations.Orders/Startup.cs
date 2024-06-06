using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Stripe.Onboarding.Foundations.Cart.Services;

namespace Stripe.Onboarding.Foundations.Orders
{
    public static class Startup
    {
        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            // SERVICES
            services.AddSingleton<IOrderService, OrderService>();
        }
    }
}
