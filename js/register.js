let user = JSON.parse(localStorage.getItem('users'));

let form = document.querySelector('#form');
let input = form.querySelectorAll('input');

let usernameInput = document.getElementById('username');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');


let eye = document.querySelector('#seePass').querySelector('i');

function checkValidRegister() {
    let isValid = true;
    let showedToast = false;

    const username = usernameInput.value.trim();
    if (!username) {
        showToast(usernameInput, false, "Tên đăng nhập không được để trống", !showedToast);
        isValid = false;
        showedToast = true;
    } else if (username.length < 6) {
        showToast(usernameInput, false, "Tên đăng nhập phải từ 6 ký tự trở lên", !showedToast);
        isValid = false;
        showedToast = true;
    } else {
        showToast(usernameInput, true, "", false);
    }

    const email = emailInput.value.trim();
    if (!checkValid(emailInput, "text", "Email", !showedToast)) {
        isValid = false;
        showedToast = true;
    } else if (!emailInput.checkValidity()) {
        showToast(emailInput, false, "Email không hợp lệ", !showedToast);
        isValid = false;
        showedToast = true;
    } else if (user.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showToast(emailInput, false, "Email đã tồn tại", !showedToast);
        isValid = false;
        showedToast = true;
    } else {
        showToast(emailInput, true, "", false);
    }

    const password = passwordInput.value.trim();
    if (!checkValid(passwordInput, "text", "Mật khẩu", !showedToast)) {
        isValid = false;
        showedToast = true;
    } else if (password.length < 6) {
        showToast(passwordInput, false, "Mật khẩu phải từ 6 ký tự trở lên", !showedToast);
        isValid = false;
        showedToast = true;
    } else {
        showToast(passwordInput, true, "", false);
    }

    const confirmInput = document.getElementById('passConfirm');
    const confirmPassword = confirmInput.value.trim();
    if (!confirmPassword) {
        showToast(confirmInput, false, "Xác nhận mật khẩu không được để trống", !showedToast);
        isValid = false;
    } else if (confirmPassword !== password) {
        showToast(confirmInput, false, "Mật khẩu không khớp", !showedToast);
        isValid = false;
    } else {
        showToast(confirmInput, true, "", false);
    }
    if (isValid) {
        showToast(null, true, "Đăng ký thành công", true);
    }
    return isValid;
}


function registerPage() {
    if (!checkValidRegister()) {
        return;
    }
    user.push({
        id: user.length + 1,
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
        role: "user"
    });
    localStorage.setItem('users', JSON.stringify(user));
    setTimeout(() => {
        location.href = "./login.html";
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


