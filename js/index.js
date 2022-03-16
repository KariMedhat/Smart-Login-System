const userNameInput = document.getElementById('userNameInput');
const userEmailInput = document.getElementById('userEmailInput');
const userPasswordInput = document.getElementById('userPasswordInput');
const signupBtn = document.getElementById("signupBtn");

var isUserExist = false;

let userInfo;
if (localStorage.getItem('users') == null) // first time login
{
    userInfo = [];
} else {
    userInfo = JSON.parse(localStorage.getItem('users'));
}

function signUp() {
    // userInputsValidation(); // First Charachter is capital // 5-15 char // email : @
    isExist(); // if mail available?

    if (userInputsValidation() == true && isUserExist == false) {

        let user = {
            name: userNameInput.value, // ahmed
            email: userEmailInput.value, // example@example.com
            password: userPasswordInput.value, // 12345
        };
        userInfo.push(user) // array of objects = json
        localStorage.setItem('users', JSON.stringify(userInfo));

        let confirmMsg = document.getElementById('confirmMsg');
        confirmMsg.classList.replace('d-none', 'd-block'); // Success

        let signIn = document.getElementById('signIn');
        signIn.classList.replace('d-none', 'd-block');

    } else {
        let tryAgainMsg = document.getElementById('tryAgainMsg');
        tryAgainMsg.classList.replace('d-none', 'd-block'); // Faild
    }
}

function userNameValidation() {
    let usernameAlert = document.getElementById('usernameAlert');
    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/; //@[a-z]{3,10}\.(com)
    if (regex.test(userNameInput.value) == true && userNameInput.value != '') {
        userNameInput.classList.add('is-valid');
        userNameInput.classList.remove('is-invalid');
        usernameAlert.classList.replace('d-block', 'd-none');
        return true;
    } else {
        userNameInput.classList.add('is-invalid');
        userNameInput.classList.remove('is-valid');
        usernameAlert.classList.replace('d-none', 'd-block');
        return false;
    }
}

function userEmailValidation() {
    let userEmailAlert = document.getElementById('userEmailAlert');
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(userEmailInput.value) == true && userEmailInput.value != '') {
        userEmailInput.classList.add('is-valid');
        userEmailInput.classList.remove('is-invalid');
        userEmailAlert.classList.replace('d-block', 'd-none');
        return true;
    } else {
        userEmailInput.classList.add('is-invalid');
        userEmailInput.classList.remove('is-valid');
        userEmailAlert.classList.replace('d-none', 'd-block');
        return false;
    }
}

function userPasswordValidation() {
    let regex = /^.{5,15}/;
    let userPasswordAlert = document.getElementById('userPasswordAlert');
    if (regex.test(userPasswordInput.value) == true && userPasswordInput.value != '') {
        userPasswordInput.classList.add('is-valid');
        userPasswordInput.classList.remove('is-invalid');
        userPasswordAlert.classList.replace('d-block', 'd-none');
        return true;
    } else {
        userPasswordInput.classList.add('is-invalid');
        userPasswordInput.classList.remove('is-valid');
        userPasswordAlert.classList.replace('d-none', 'd-block');
        return false;
    }

}

function isExist() {
    let accountExistMsg = document.getElementById('accountExistMsg');
    for (let i = 0; i < userInfo.length; i++) {
        if (userInfo[i].name.toLowerCase() == userNameInput.value.toLowerCase() || userInfo[i].email.toLowerCase() == userEmailInput.value.toLowerCase()) {
            accountExistMsg.classList.replace('d-none', 'd-block');
            userNameInput.classList.remove('is-valid');
            userEmailInput.classList.remove('is-valid');
            userPasswordInput.classList.remove('is-valid');
            isUserExist = true
        }
    }
}

function userInputsValidation() {
    if (userNameValidation() == true && userPasswordValidation() == true && userEmailValidation() == true) {
        return true;
    } else {
        return false;
    }
}

let username = localStorage.getItem('sessionUserName');

function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let loginBtn = document.getElementById('loginBtn');
    let incorrect = document.getElementById('incorrect');

    if (email.value == '' || password.value == '') // empty inputs
    {
        let fillMsg = document.getElementById('fillMsg');
        fillMsg.classList.replace('d-none', 'd-block');
        return false;
    }
    for (let i = 0; i < userInfo.length; i++) {
        if (userInfo[i].email.toLowerCase() == email.value.toLowerCase() && userInfo[i].password.toLowerCase() == password.value.toLowerCase()) {
            localStorage.setItem('sessionUserName', userInfo[i].name)
            // loginBtn.setAttribute('href', 'welcome.html')
            window.location.href='welcome.html'
        } else {
            incorrect.classList.replace('d-none', 'd-block');
        }
    }

}

function displayWelcomeUser() {
    document.getElementById('username').innerHTML = 'Welcome' + username;

}

function logout() {
    localStorage.removeItem('sessionUserName')
}