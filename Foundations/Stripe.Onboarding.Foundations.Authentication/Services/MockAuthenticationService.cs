using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stripe.Onboarding.Foundations.Authentication.Services
{
    public class MockAuthenticationService : IMockAuthenticationService
    {
        public MockAuthenticationService()
        {
        }
        public Guid GetSessionUser()
        {
            return Guid.Empty;
        }
    }
}
