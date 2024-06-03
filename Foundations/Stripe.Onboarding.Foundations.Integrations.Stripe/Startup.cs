using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Models.Config;
using Stripe.Onboarding.Foundations.Integrations.Stripe.Services;

namespace Stripe.Onboarding.Foundations.Integrations.Stripe
{
    public static class Startup
    {
        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            // CONFIGS
            services.Configure<StripeConfig>(options =>
            {
                configuration.GetSection(Constants.Settings.ConfigName).Bind(options);

                options.SecretKey = configuration[Constants.Settings.SecretKey];
            });
            // SERVICES
            services.AddTransient<IStripeCheckoutService, StripeCheckoutService>();
        }
    }
}
