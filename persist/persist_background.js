chrome.runtime.onConnect.addListener(port => {
    if (port.name !== 'foo') return
    port.onMessage.addListener(onMessage)
    port.onDisconnect.addListener(deleteTimer)
    port._timer = setTimeout(forceReconnect, 250e3, port)
});

function onMessage(msg, port) {
    console.log('received', msg, 'from', port.sender)
}

function forceReconnect(port) {
    deleteTimer(port)
    port.disconnect()
}

function deleteTimer(port) {
    if (port._timer) {
        clearTimeout(port._timer)
        delete port._timer
    }
}