using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stripe.Onboarding.Foundations.Authentication.Services
{
    public class MockAuthenticationService : IMockAuthenticationService
    {
        Guid userId;
        public MockAuthenticationService()
        {
            userId = Guid.NewGuid();
        }
        public Guid GetSessionUser()
        {
            return userId;
        }
    }
}
