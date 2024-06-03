using Newtonsoft.Json;

namespace Stripe.Onboarding.Foundations.Common.Models
{
    public class ProductItem
    {
        [JsonProperty("image")]
        public string Image { get; set; }
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("amount")]
        public int Amount { get; set; }
    }
}
