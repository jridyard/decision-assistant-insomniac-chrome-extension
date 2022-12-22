window.history.pushState("object or string", "Title", "/onboarding");
document.querySelector('[rel="icon"]').href = chrome.runtime.getURL('extension_pages/assets/img/favicon/favicon.ico');

globalThis.PULLER_NAME;

const inputs = [
    document.querySelector('#brokerRole'),
    document.querySelector('#pullerRole')
]

inputs.forEach(input => {
    input.addEventListener('change', (e) => {
        const checkedRoleId = e.currentTarget.id
        const unCheckedRoleId = checkedRoleId === 'brokerRole' ? 'pullerRole' : 'brokerRole'
        document.querySelector('#' + checkedRoleId).closest('.custom-option').classList.add('checked')
        document.querySelector('#' + unCheckedRoleId).closest('.custom-option').classList.remove('checked')
    })
});

const nextButton = document.querySelector('.btn-next');
nextButton.addEventListener('click', () => {
    const roleWasSelected = document.querySelector('[id="brokerRole"]:checked') || document.querySelector('[id="pullerRole"]:checked')
    if (roleWasSelected) {
        roleSelected();
        setDisplay('#noRoleSelectedWarning', "none");
    }
    else {
        setDisplay('#noRoleSelectedWarning', "contents");
    }
});

function setDisplay(selector, display) {
    const element = document.querySelector(selector);
    element.style.display = display;
}

function roleSelected() {
    const optionSelected = document.querySelector('.form-check-input:checked').id

    if (optionSelected === 'brokerRole') {

        onlyShowSwalIfNotSignedInToPullerAccount(optionSelected)

    }

    else if (optionSelected === 'pullerRole') {

        onlyShowSwalIfNotSignedInToPullerAccount(optionSelected)

    }
}

function onlyShowSwalIfNotSignedInToPullerAccount(optionSelected) {
    getStorage(['puller_id', 'role']).then(data => {
        const puller_id = data.puller_id
        const role = data.role // this way, we can keep their puller id so they can copy paste it from the error swal if needed.
        if (role && puller_id) {
            getPuller(puller_id).then(data => {

                if (data.message == "Invalid Puller Account ID. It is possible your account has been removed. Please contact your admin.") {
                    return chrome.storage.local.set({
                        puller_id: null,
                        role: null
                    }).then(data => {
                        launchSwal(optionSelected)
                    });
                }

                const puller_name = data.puller_name;
                Swal.fire({
                    icon: "info",
                    title: `Hey there, ${puller_name}!`,
                    text: "You already have a puller account signed into the extension. If you need to re-activate your account, please sign out first.",
                    showCancelButton: true,
                    confirmButtonText: 'Sign Out',
                    cancelButtonText: 'Cancel',
                }).then(async (confirm) => {
                    // window.close();
                    if (confirm.isConfirmed) {
                        await chrome.storage.local.set({
                            role: null
                        });

                        Swal.fire(
                            'You are signed out!',
                            'You will now be able to reactive your account.',
                            'success'
                        )
                    }
                });

            });
        }
        else {
            launchSwal(optionSelected)
        }
    })
}

async function launchSwal(optionSelected) {
    if (optionSelected == 'pullerRole') {
        launchOptionsSwal()
    }
    else if (optionSelected == 'brokerRole') {

        chrome.storage.local.set({
            role: "broker",
        });

        Swal.fire(
            "You're all set!",
            'As a broker, the extension allows you to see the timer tick down in Discord. Press OK to close the window.',
            'success'
        ).then(confirm => {
            window.close();
        });
    }
}

function launchOptionsSwal() {
    Swal.fire({
        title: 'Do you want to register a new puller account or sign into an existing one?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Register',
        denyButtonText: 'Sign In',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            launchRegisterSwal()
        } else if (result.isDenied) {
            launchLoginSwal()
        }
    });
}

function launchRegisterSwal() {
    Swal.fire({
        title: 'Register New Puller Account',
        html: `<input id="puller_name" placeholder="Username" class="swal2-input">
               <input id="access_code" placeholder="Activation Code" class="swal2-input">`,
        showDenyButton: true,
        denyButtonText: 'Go back',
        customClass: {
            denyButton: 'go-back-button'
        },
        confirmButtonText: 'Register',
        showLoaderOnConfirm: true,
        
        preConfirm: () => {
            const puller_name = document.querySelector('#puller_name').value
            const access_code = document.querySelector('#access_code').value

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        
            var raw = JSON.stringify({
                "access_code": access_code,
                "puller_name": puller_name
            });
        
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
        
            return fetch("https://ml9vc2mdg5.execute-api.us-west-2.amazonaws.com/v1/registerPuller", requestOptions)
                .then(response => {
                    if (!response.ok) {
                        console.log("response", response)
                        return response.json()
                            .then(data => {
                                console.log("data", data);
                                throw new Error(data.message);
                            });
                    }

                    PULLER_NAME = puller_name;
                    return response.json();
                })
                .catch(error => {
                    Swal.showValidationMessage(error);
                });
        },

        allowOutsideClick: () => !Swal.isLoading()

      }).then(async function (result) {
        if (result.isDenied) {
            launchOptionsSwal()
        }
        else if (result.isConfirmed) {
            console.log('\x1b[32m%s\x1b[0m', `Registered new puller account, ${PULLER_NAME}, with ID: `, result.value.puller_uuid);

            await chrome.storage.local.set({
                role: "puller",
                puller_id: result.value.puller_uuid,
                client_secret: result.value.puller_uuid
            });

            Swal.fire({
                title: 'Registered Successfully!',
                text: `You're all set, ${PULLER_NAME}! Press OK to finish your onboarding.`,
                icon: 'success'
            }).then(confirm => {
                openOptionsPage();
            });
        }
      }).catch(swal.noop)

}

function openOptionsPage() {
    const optionsPage = chrome.runtime.getURL("extension_pages/html/options/options.html");
    window.location = optionsPage;
}


function launchLoginSwal() {
    Swal.fire({

        title: 'Enter Your Puller Account ID',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off',
            placeholder: "Puller Account Code"
        },
        showDenyButton: true,
        denyButtonText: 'Go back',
        customClass: {
            denyButton: 'go-back-button'
        },
        confirmButtonText: 'Sign In',
        showLoaderOnConfirm: true,

        preConfirm: (puller_id) => {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({
              "puller_id": puller_id,
              "login": true
            });
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            return fetch("https://ml9vc2mdg5.execute-api.us-west-2.amazonaws.com/v1/checkPuller", requestOptions)
                .then(response => {
                    if (!response.ok) {
                        console.log("response: ", response)
                        return response.json()
                            .then(data => {
                                console.log("data: ", data);
                                throw new Error(data.message);
                            });
                    }
                    return response.json();
                })
                .catch(error => {
                    Swal.showValidationMessage(error);
                });
        },

        allowOutsideClick: () => !Swal.isLoading()

    }).then(async (result) => {

        if (result.isConfirmed) {

            console.log('\x1b[32m%s\x1b[0m', `Registered ${result.value.puller_name} with ID: `, result.value.puller_id);

            await chrome.storage.local.set({
                puller_id: result.value.puller_id,
                client_secret: result.value.puller_id,
                role: "puller"
            });
            
            Swal.fire({
                title: 'Signed In Successfully!',
                text: `You're all set, ${result.value.puller_name}! Press OK to go to the options page.`,
                icon: 'success'
            }).then(confirm => {
                openOptionsPage();
            });

        }

        else if (result.isDenied) {
            launchOptionsSwal();
        }

    });
}

async function getPuller(puller_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "puller_id": puller_id,
      "get_puller": true
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    return await fetch("https://ml9vc2mdg5.execute-api.us-west-2.amazonaws.com/v1/checkPuller", requestOptions)
        .then(data => data.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            return {"error": err}
        });
}