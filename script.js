let auth2;

function initClient() {
    gapi.load('auth2', () => {
        auth2 = gapi.auth2.init({
            client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
            scope: 'profile email'
        }).then(() => {
            updateButton(); // Set initial button state
        }).catch(error => {
            console.error('Error initializing Google Auth2:', error);
        });
    });
}

function updateButton() {
    const button = document.getElementById('auth-button');
    if (auth2 && auth2.isSignedIn.get()) {
        button.textContent = 'Logout';
        button.onclick = signOut;
    } else {
        button.textContent = 'Login';
        button.onclick = signIn;
    }
}

function signIn() {
    if (auth2) {
        auth2.signIn().then(googleUser => {
            console.log('User signed in:', googleUser.getBasicProfile().getName());
            updateButton();
        }).catch(error => {
            console.error('Error signing in:', error);
        });
    }
}

function signOut() {
    if (auth2) {
        auth2.signOut().then(() => {
            console.log('User signed out.');
            updateButton();
        }).catch(error => {
            console.error('Error signing out:', error);
        });
    }
}

// Ensure the client is initialized after the Google API library is loaded
function onApiLoad() {
    gapi.load('auth2', initClient);
}

// Add onApiLoad as a callback to ensure proper library loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onApiLoad);
} else {
    onApiLoad();
}
