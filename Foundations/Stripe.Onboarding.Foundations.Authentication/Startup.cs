using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Stripe.Onboarding.Foundations.Authentication.Services;

namespace Stripe.Onboarding.Foundations.Authentication
{
    public static class Startup
    {
        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            // SERVICES
            // Singleton as the catalog is not stored in a DB
            services.AddSingleton<IMockAuthenticationService, MockAuthenticationService>();
        }
    }
}
