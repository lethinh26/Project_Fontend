let tbody = document.querySelector("tbody");
let categoryList = JSON.parse(localStorage.getItem("category")) || [];
let form = document.querySelector('#form');
let input = form.querySelectorAll('input');

let inputName = document.querySelector("#inputName");
let inputEmoji = document.querySelector("#inputEmoji");

let toast = document.querySelector('#loadToast');
let toastBody = document.querySelector('.toast-body');
let toastBootstrap = new bootstrap.Toast(toast);

let innerError = `<img src="../../assets/icons/error.png" alt="" style="height: 25px"/>`;
let innerSuccess = `<img src="../../assets/icons/success.png" alt="" style="height: 25px"/>`;

let currentPage = 1;
let item = 5;
let totalPages = Math.ceil(categoryList.length / item);


function renderData() {
    let start = (currentPage-1) * item;
    let end = start + item;
    let listCate = categoryList.slice(start, end);

    tbody.innerHTML = listCate.reduce((temp, cate) =>
        temp + `
            <tr>
                <th scope="row">${cate.id}</th>
                <td>${cate.categoryEmoji} ${cate.categoryName}</td>
                <td>
                    <button class="btn btn-primary editBtn" 
                      data-id="${cate.id}" 
                      data-bs-toggle="modal" 
                      data-bs-target="#inputModal" onclick="processModal('edit',this)">Sửa</button>

                    <button class="btn btn-danger deleteBtn" 
                      data-id="${cate.id}" 
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal" onclick="processModal('delete',this)">Xóa</button>
                </td>
            </tr>`, "");
    pagination();
}


function processModal(type, btn) {
    inputEmoji.classList.remove("is-valid", "is-invalid");
    inputName.classList.remove("is-valid", "is-invalid");
    inputEmoji.value = "";
    inputName.value = "";
    toastBody.innerHTML = "";
    toast.classList.remove("bg-danger", "bg-success");

    if (type === "add") {
        document.querySelector("#inputModal").setAttribute("data-type", "add");
        console.log(document.querySelector("#inputModal"))
    }else if (type === "edit") {
        document.querySelector("#inputModal").setAttribute("data-type", "edit");
        let id = btn.getAttribute('data-id');
        inputEmoji.value = categoryList.find(cate => cate.id == id).categoryEmoji;
        inputName.value = categoryList.find(cate => cate.id == id).categoryName;
        form.setAttribute('data-id', id);
    }else if (type === "delete") {
        let id = btn.getAttribute('data-id');
        document.querySelector('#deleteModal').setAttribute('data-id', id);
    }
}

function inputModal() {
    let type = document.querySelector("#inputModal").getAttribute("data-type");
    if (type === "add") {
        addBtn();
    } else if (type === "edit") {
        editModal();
    }
}

function addBtn() {
    let id = categoryList.length ? categoryList.length+1 : 1;
    let categoryName = inputName.value.trim();
    let categoryEmoji = inputEmoji.value.trim();

    if (checkValid(categoryName, categoryEmoji)) {
        categoryList.push({id, categoryName, categoryEmoji});
        localStorage.setItem("category", JSON.stringify(categoryList));
        showToast("Thêm danh mục thành công");
        bootstrap.Modal.getInstance(document.getElementById('inputModal')).hide();
    }
    renderData();
}

function deleteModal() {
    let id = document.querySelector('#deleteModal').getAttribute('data-id');
    categoryList = categoryList.filter(cate => cate.id != id);
    localStorage.setItem("category", JSON.stringify(categoryList));
    showToast("Xóa danh mục thành công");
    renderData();
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
        bootstrap.Modal.getInstance(document.getElementById('inputModal')).hide();
    }
    renderData();
}


function checkValid(name, emoji) {
    let isValid = true;
    let currentId = form.getAttribute('data-id');

    if (!name) {
        showToast("Tên danh mục không được để trống", inputName, false);
        isValid = false;


    }else if (categoryList.some(cate => cate.categoryName.toLowerCase() === name.toLowerCase() && cate.id != currentId)) {
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

    if (isValid) {
        inputElement.classList.add("is-valid");
    } else {
        inputElement.classList.add("is-invalid");
        toastBody.innerHTML += innerError + message + "<br>";
        toast.classList.add("bg-danger");
    }
}

function pagination() {
    let pag = document.querySelector(".pagination");
    pag.innerHTML = "";
    pag.innerHTML += `<li class="page-item ${currentPage===1? 'disabled' : ''}" data-page=${currentPage-1}><a class="page-link" >&lt;</a></li>`;
    for (let i = 1; i <= totalPages; i++) {
        pag.innerHTML += `<li class="page-item ${currentPage===i? 'active' : ''}" data-page=${i}><a class="page-link" >${i}</a></li>`;
    }
    pag.innerHTML += `<li class="page-item ${currentPage===totalPages? 'disabled' : ''}" data-page=${currentPage+1}><a class="page-link" >&gt;</a></li>`;
    document.querySelectorAll(".page-item").forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            let page = Number(item.getAttribute("data-page"));
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                renderData();
            }
        })
    })
}

renderData();






