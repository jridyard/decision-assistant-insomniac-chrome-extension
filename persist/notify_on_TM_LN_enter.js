// Used to make sure background.js starts running the moment we hit a page to open the service worker.
chrome.runtime.sendMessage({
    'message': 'enteredTicketmasterOrLiveNation'
})