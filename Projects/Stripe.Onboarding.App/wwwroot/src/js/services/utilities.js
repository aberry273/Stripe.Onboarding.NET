export function emit(wssEvent, ev, data) {
    const event = `${wssEvent}:${ev}`
    window.dispatchEvent(new CustomEvent(event, { detail: data }));
};

export const connectedEvent = 'connected';
export const messageEvent = 'onmessage';
const sendMessageRequest = 'sendMessage';

export async function createClient(url, wssEvent ) {
    try {
        const client = new signalR.HubConnectionBuilder()
            .withUrl(url)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        client.onclose(async () => {
            await client.start();
        });
        
        client.on(sendMessageRequest, (user, message) => {
            const received = `${user}: ${message}`; 
            // Handle responses
            const payload = {
                user: user,
                // {code, type, data}
                data: message
            }
            emit(wssEvent, messageEvent, payload);
        });
        return client;
    } catch (err) {
        console.log(err);
    }
}