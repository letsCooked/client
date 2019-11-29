function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2
        .signOut()
        .then(function () {
            localStorage.removeItem('access_token')
            // console.log('User signed out.');
            loggingOut()
        });
}