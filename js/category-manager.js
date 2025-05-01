let tbody = document.querySelector("tbody");
let categoryList = JSON.parse(localStorage.getItem("category")) || [];
let form = document.querySelector('#form');
let input = form.querySelectorAll('input');


let inputName = document.querySelector("#inputName");
let inputEmoji = document.querySelector("#inputEmoji");


let toast = document.querySelector('#loadToast');
let toastBody = document.querySelector('.toast-body');
let toastBootstrap = new bootstrap.Toast(toast);

let innerError = `<img src="../assets/icons/error.png" alt="" style="height: 25px"/> `;
let innerSuccess = `<img src="../assets/icons/success.png" alt="" style="height: 25px"/> `;

function renderData() {
    tbody.innerHTML = categoryList.reduce((temp, cate) =>
        temp + `
            <tr>
                <th scope="row">${cate.id}</th>
                <td>${cate.categoryEmoji} ${cate.categoryName}</td>
                <td>
                    <button class="btn btn-primary editBtn" 
                      data-id="${cate.id}" 
                      data-bs-toggle="modal" 
                      data-bs-target="#addModal" onclick="editBtn(this)">Sửa</button>

                    <button class="btn btn-danger deleteBtn" 
                      data-id="${cate.id}" 
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal" onclick="deleteBtn(this)">Xóa</button>
                </td>
            </tr>`, "");
}

function addBtn() {
    let id = categoryList.length ? categoryList.length+1 : 1;
    let categoryName = inputName.value.trim();
    let categoryEmoji = inputEmoji.value.trim();

    if (checkValid(categoryName, categoryEmoji)) {
        categoryList.push({id, categoryName, categoryEmoji});
        localStorage.setItem("category", JSON.stringify(categoryList));
        showToast("Thêm danh mục thành công");
        bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
    }
    renderData();
}

function deleteBtn(btn) {
    let id = btn.getAttribute('data-id');
    document.querySelector('#deleteModal').setAttribute('data-id', id);
}

function deleteModal() {
    let id = document.querySelector('#deleteModal').getAttribute('data-id');
    categoryList = categoryList.filter(cate => cate.id != id);
    localStorage.setItem("category", JSON.stringify(categoryList));
    renderData();
}

function editBtn(btn) {
    let id = btn.getAttribute('data-id');
    form.setAttribute('data-id', id);
}

function editModal() {
    let id = form.getAttribute('data-id');
    let categoryName = inputName.value.trim();
    let categoryEmoji = inputEmoji.value.trim();
    if (checkValid(categoryName, categoryEmoji)) {
        let index = categoryList.findIndex(cate => cate.id == id);
        categoryList[index] = {id, categoryName, categoryEmoji};
        localStorage.setItem("category", JSON.stringify(categoryList));
        showToast("Sửa danh mục thành công");
        bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
    }
}


function checkValid(name, emoji) {
    let isValid = true;
    toastBody.innerHTML = "";
    toast.classList.remove("bg-danger", "bg-success");

    if (!name) {
        showToast("Tên danh mục không được để trống", inputName, false);
        isValid = false;
    } else if (categoryList.some(cate => cate.categoryName.toLowerCase() === name.toLowerCase())) {
        showToast("Tên danh mục đã tồn tại", inputName, false);
        isValid = false;
    } else {
        showToast("", inputName, true);
    }

    if (!emoji) {
        showToast("Emoji không được để trống", inputEmoji, false);
        isValid = false;
    } else {
        showToast("", inputEmoji, true);
    }

    if (!isValid) toastBootstrap.show();
    return isValid;
}


function showToast(message, inputElement = "", isValid = false) {
    if (!inputElement && !isValid) {
        toastBody.innerHTML += innerSuccess + message + "<br>";
        toast.classList.add("bg-success");
        toastBootstrap.show();
        return;
    }

    inputElement.classList.remove("is-valid", "is-invalid");

    if (isValid) {
        inputElement.classList.add("is-valid");
    } else {
        inputElement.classList.add("is-invalid");
        toastBody.innerHTML += innerError + message + "<br>";
        toast.classList.add("bg-danger");
    }
}

renderData()