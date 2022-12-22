window.history.pushState("object or string", "Title", "/options");
document.querySelector('[rel="icon"]').href = chrome.runtime.getURL('extension_pages/assets/img/favicon/favicon.ico');

// main =>
getStorage(['auto_connect', 'socket_connected']).then(data => {
    const autoConnect = data.auto_connect;
    const isConnected = data.socket_connected;
    document.querySelector('#connectDisconnect').checked = isConnected;
    document.querySelector('#autoConnect').checked = autoConnect;
});

chrome.runtime.sendMessage({
    'message': 'getSocketStatus'
}, (e) => {
    if (e.connected) connectDisconnect.checked = true;
    if (!e.connected) connectDisconnect.checked = false;
});

const connectDisconnect = document.querySelector('#connectDisconnect');

connectDisconnect.addEventListener('change', async (e) => {
    const isChecked = e.currentTarget.checked;

    if (isChecked) {
        e.currentTarget.disabled = true
        // Turned on ...
        chrome.runtime.sendMessage({
            'message': 'connectToSocket'
        })
        return;
    }

    // // Turned off ...
    chrome.runtime.sendMessage({
        'message': 'disconnectSocket'
    });

});

const autoConnect = document.querySelector('#autoConnect');

autoConnect.addEventListener('change', async (e) => {
    const isChecked = e.currentTarget.checked;
    await chrome.storage.local.set({ 'auto_connect': isChecked });
});

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {

    console.log('\x1b[32m%s\x1b[0m', `sdsdsdsd`)

    if (request.message == 'socketStatus') {

        sendResponse({'message': 'receieved socket status'}) // this does not end the chain, the rest will still continue

        await delay(200)

        connectDisconnect.disabled = false


        if (!request.connected) connectDisconnect.checked = false;
        if (request.connected) connectDisconnect.checked = true;

        if (request.error) {
            // fireToast({
            //     title: 'Unable to connect!',
            //     message: request.info
            // });
            fireToast({
                title: "Error",
                type: "bg-danger",
                duration: request.duration,
                title: "Unable to connect!",
                message: request.info,
            });
            return;
        };

        fireToast({
            title: request.connected ?
                        'You are now connected!' :
                        'You have disconnected!',
            message: request.connected ?
                        'When you enter a checkout page, the details will be sent to discord.' :
                        'Your current pulling session has concluded. If you cart any tickets, the details will not be sent to discord.'
        });
        return;

    };

});

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}