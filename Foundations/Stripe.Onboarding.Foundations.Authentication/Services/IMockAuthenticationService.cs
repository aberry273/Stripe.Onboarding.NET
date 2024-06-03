using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stripe.Onboarding.Foundations.Authentication.Services
{
    public interface IMockAuthenticationService
    {
        Guid GetSessionUser();
    }
}
