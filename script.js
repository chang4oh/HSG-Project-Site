let isLoggedIn = false;

function onSignIn(googleUser) {
    isLoggedIn = true;
    updateButton();
}

function signOut() {
    if (isLoggedIn) {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            isLoggedIn = false;
            updateButton();
        });
    }
}

function updateButton() {
    const button = document.getElementById('auth-button');
    if (isLoggedIn) {
        button.textContent = 'Logout';
        button.onclick = signOut;
    } else {
        button.textContent = 'Login';
        button.onclick = () => document.querySelector('.g-signin2').click();
    }
}

// Initial button state
updateButton();
