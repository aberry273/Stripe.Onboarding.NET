export default function (data){
    // TODO: Determine if this is the best approach for an app
    // Creates a dependency between client > server, where it should be server > client
    return {
        sourceUrl: data.sourceUrl,
        async init() {
            //console.log('authManager.init')
            // Uncomment below if determined this is appropriate
            //await this.fetchUser();
        },
        user: {},
        
        get getUser() { return this.user },
        
        async fetchUser() {
            try {
                const results = await this.$fetch.GET(this.sourceUrl);
                this.setUser(results);
            }
            catch(e) {
                this.setUser({
                    userId: "AA20E580-B222-4B44-516D-08DC47846AB6",
                    Username: "DEV"
                })
            }
        },
        setUser(user) {
            this.$store.users.setUser(user);
        }
    }
}