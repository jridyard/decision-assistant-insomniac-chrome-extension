function reset() {
    chrome.storage.local.set({
        'role': null,
        'puller_id': null
    });
}