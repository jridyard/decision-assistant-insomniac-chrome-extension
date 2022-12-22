// ESTABLiSHES CONSTANT CONNECTION FROM CONTENT SCRIPTS TO BACKGROUND.JS
// Without this, the worker will go inactive at various time intervals and break almost everything if the user tries to use the extension afterwards.
// Luckily, we have this code to stop that issue!
let port;

function connect() {
    port = chrome.runtime.connect({name: 'foo'});
    port.onDisconnect.addListener(connect);
    port.onMessage.addListener(msg => {
        console.log("Background Persistence Message Received...")
        console.log('received', msg, 'from bg');
    });
}

connect();