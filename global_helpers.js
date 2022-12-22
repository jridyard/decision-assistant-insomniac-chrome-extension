async function getStorage(key, callback) {
    return new Promise(async function (resolve, reject) {
        chrome.storage.local.get(key, async function (response_data) {
            if (callback) await callback(response_data);
            resolve(response_data);
        })
    })
}