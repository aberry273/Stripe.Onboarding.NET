// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
try {
    const stripe = Stripe('@Model.PublicKey');

    initialize();

    // Create a Checkout Session
    async function initialize() {
        const fetchClientSecret = async () => {
            const response = await fetch("@Model.PostbackUrl", {
                method: "POST",
            });
            const { clientSecret } = await response.json();
            return clientSecret;
        };
        var key = await fetchClientSecret();

        const checkout = await stripe.initEmbeddedCheckout({
            fetchClientSecret,
        });

        // Mount Checkout
        checkout.mount('#checkout');
    }
}
catch (e) {

}
