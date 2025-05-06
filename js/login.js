let user = JSON.parse(localStorage.getItem('users'));

let form = document.querySelector('#form');
let input = form.querySelectorAll('input');

let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');

let rememberMe = document.querySelector('.rememberMe');

let eye = document.querySelector('#seePass').querySelector('i');

function checkValidLogin() {
    let isValid = true;
    let showedToast = false;

    if (!checkValid(emailInput, "text", "Email")) {
        isValid = false;
        showedToast = true;
    } else if (!emailInput.checkValidity()) {
        showToast(emailInput, false, "Email không hợp lệ", !showedToast);
        isValid = false;
        showedToast = true;
    } else if (!user.some(u => u.email.toLowerCase() === emailInput.value.trim().toLowerCase())) {
        showToast(emailInput, false, "Email hoặc mật khẩu không chính xác", !showedToast);
        isValid = false;
        showedToast = true;
    } else {
        showToast(emailInput, true, "", false);
    }

    if (isValid) {
        if (!checkValid(passwordInput, "text", "Mật khẩu", !showedToast)) {
            isValid = false;
        } else {
            let checkUser = user.find(u => u.email.toLowerCase() === emailInput.value.trim().toLowerCase());
            if (checkUser && checkUser.password !== passwordInput.value) {
                showToast(passwordInput, false, "Email hoặc mật khẩu không chính xác", !showedToast);
                isValid = false;
            } else {
                showToast(passwordInput, true, "", false);
            }
        }
    }

    if (isValid) {
        let userValid = user.find(u => u.email.toLowerCase() === emailInput.value.trim().toLowerCase());
        if (rememberMe.checked) {
            localStorage.setItem("user", JSON.stringify({username: userValid.username, email: userValid.email, role: userValid.role}));
        } else {
            sessionStorage.setItem("user", JSON.stringify({username: userValid.username, email: userValid.email, role: userValid.role}));
        }

        showToast(null, true, "Đăng nhập thành công", true);
    }
    return isValid;
}



function loginPage() {
    if (!checkValidLogin()) {
        return;
    }
    setTimeout(() => {
        location.href = "../page/user/dashboard.html";
    }, 1000);
}

function seePass() {
    if (eye.className === "fa-regular fa-eye") {
        eye.className = "fa-regular fa-eye-slash";
        passwordInput.type = "text";
    } else {
        eye.className = "fa-regular fa-eye";
        passwordInput.type = "password";
    }
}


