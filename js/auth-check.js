let userLocal = JSON.parse(localStorage.getItem('user'));
let userSession = JSON.parse(sessionStorage.getItem('user'));

let header = document.querySelector('#header');
let footer = document.querySelector('footer');

const innerHeader = `<nav class="navbar p-2 navbar-expand-lg">
    <div class="container-fluid">
      <a href="#" class="navbar-brand text-white">QuizzForge</a>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item me-3">
            <a class="nav-link active text-white" href="../user/dashboard.html" aria-current="page">Trang chủ</a>
          </li>
          <li class="nav-item me-3 need-admin">
            <a class="nav-link text-danger" href="../admin/category-manager.html">Quản lý danh mục</a>
          </li>
          <li class="nav-item me-3 need-admin">
            <a class="nav-link text-danger" href="../admin/product-manager.html">Quản lý bài test</a>
          </li>
        </ul>
      </div>

      <div class="d-flex justify-content-center align-items-center">
        <a href="../../auth/login.html" class="btn btn-outline-light me-2 not-login">Đăng nhập</a>
        <a href="../../auth/register.html" class="btn btn-outline-light not-login">Đăng ký</a>
        <a href="../../auth/login.html" class="fw-bold has-login" onclick="logoutBtn()" style="color: #fa7770; text-wrap: nowrap">Đăng Xuất <i class="fa-solid fa-right-from-bracket"></i></a>
      </div>
    </div>
  </nav>`;

const innerFooter = `<footer class="py-3 mt-4 d-flex">
  <span class="text-white m-auto">© 2025 QuizForge. All rights reserved.</span>
</footer>`


header.innerHTML = innerHeader;
footer.innerHTML = innerFooter;

let notLogin = document.querySelectorAll('.not-login');
let hasLogin = document.querySelector('.has-login');

if (userLocal || userSession) {
    notLogin.forEach(item => item.style.display = 'none');
    if (hasLogin) hasLogin.style.display = 'block';
} else {
    notLogin.forEach(item => item.style.display = 'block');
    if (hasLogin) hasLogin.style.display = 'none';
}
authorizationUser();

function logoutBtn() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    location.href = "../../auth/login.html";
}

function authorizationUser() {
    if (userLocal && userLocal.role === "user" || userSession && userSession.role === "user" || !userLocal && !userSession) {
        document.querySelectorAll(".need-admin").forEach(item => item.style.display = 'none');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let role = userLocal ? userLocal.role : userSession ? userSession.role : null;
    let currentPath = window.location.pathname;
    if (currentPath.includes("admin")) {
        if (role !== "admin") {
            logoutBtn();
            location.href="../../auth/login.html";
        }
    }
})

