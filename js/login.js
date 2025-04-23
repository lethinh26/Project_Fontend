let user = JSON.parse(localStorage.getItem('user'));

let form = document.querySelector('#form');
let input = form.querySelectorAll('input');

let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');

let eye = document.querySelector('#seePass').querySelector('i');

let toast = document.querySelector('#loadToast');
let toastBody = document.querySelector('.toast-body');
let toastBootstrap = new bootstrap.Toast(toast);

let innerError = `<img src="../assets/icons/error.png" alt="" style="height: 25px"/> `;
let innerSuccess = `<img src="../assets/icons/success.png" alt="" style="height: 25px"/> `;

function checkValid() {
    let isValid = true;
    toastBody.innerText = "";
    toast.classList.remove("bg-danger", "bg-success");

    input.forEach(item => {
        item.classList.remove("is-valid", "is-invalid");

        let value = item.value.trim();
        if (item.id === "email") {
            if (!value) {
                toastBody.innerHTML += innerError + "Email không được để trống<br>";
                item.classList.add("is-invalid");
                isValid = false;
            } else if (!item.checkValidity()) {
                toastBody.innerHTML += innerError + "Email không hợp lệ<br>";
                item.classList.add("is-invalid");
                isValid = false;
            } else if (!user.some(i => i.email.toLowerCase() === value.toLowerCase())) {
                toastBody.innerHTML += innerError + "Email không tồn tại<br>";
                item.classList.add("is-invalid");
                isValid = false;
            } else {
                item.classList.add("is-valid");
            }
        }else if (item.id === "password") {
            if (!value) {
                toastBody.innerHTML += innerError + "Mật khẩu không được để trống<br>";
                item.classList.add("is-invalid");
                isValid = false;
            } else if (user.find(i => i.email.toLowerCase() === emailInput.value.trim().toLowerCase()).password !== value) {
                toastBody.innerHTML += innerError + "Mật khẩu không chính xác<br>";
                item.classList.add("is-invalid");
                isValid = false;
            } else {
                item.classList.add("is-valid");
            }
        }
    });

    if (!isValid) {
        toast.classList.add("bg-danger");
        toastBootstrap.show();
        return false;
    }else {
        toast.classList.remove("bg-danger");
        toast.classList.add("bg-success");
        toastBody.innerHTML = innerSuccess + "Đăng nhập thành công";
        toastBootstrap.show();
        return true;
    }
}

function loginPage() {
    if (!checkValid()) {
        return;
    }
    location.href = "./login.html";
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


