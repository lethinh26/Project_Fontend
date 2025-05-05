let testList = JSON.parse(localStorage.getItem('test'));
let filterList = [];
let tbody = document.querySelector('#tbody');

let currentPage = 1;
let item = 5;

function renderData(list = testList) {
    let start = (currentPage-1) * item;
    let end = start + item;
    list = list.slice(start, end);
    tbody.innerHTML = list.reduce((temp, test, index) => temp + `
    <tr>
      <th scope="row">${index+1}</th>
      <td>${test.testName}</td>
      <td>${test.questions.length}</td>
      <td>${test.playTime}</td>
      <td>
        <button class="btn btn-primary" onclick="location.href='./product-create.html?mode=edit&id=${index}'">Sửa</button>
        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="document.querySelector('#deleteModal .btn-confirm').setAttribute('data-id', ${index})">Xóa</button>
      </td>
    </tr>
    `, "")
    pagination();
}

function searchTest() {
    let searchValue = document.querySelector('#searchInput').value.trim();
    filterList = testList.filter(test => test.testName.toLowerCase().includes(searchValue.toLowerCase()))
    renderData(filterList)
}


function deleteModal(id) {
    testList.splice(Number(id), 1);
    localStorage.setItem('test', JSON.stringify(testList));
    showToast(null, true, "Xóa thành công");
    renderData();
}

function pagination() {
    let totalPage = Math.ceil(testList.length / item);
    let pag = document.querySelector('.pagination');
    pag.innerHTML = `<li class="page-item ${currentPage===1? 'disabled' : ''}" data-page="1"><a class="page-link" href="">&lt;</a></li>`
    for (let i = 1; i <= totalPage; i++) {
        pag.innerHTML += `<li class="page-item ${currentPage===i? 'active' : ''}" data-page="${i}"><a class="page-link" href="">${i}</a></li>`
    }
    pag.innerHTML += `<li class="page-item ${currentPage===totalPage? 'disabled' : ''}" data-page="${totalPage}"><a class="page-link"  href="">&gt;</a></li>`

    document.querySelectorAll(".page-item").forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            let page = item.getAttribute('data-page');
            console.log(page)
            if (page >=1 && page <= totalPage) {
                currentPage = page;
                renderData();
            }
        })
    })
}

document.querySelector("#sortIncrease").addEventListener("click", () => {
    let sort = filterList.length < 1 ? testList.sort((a,b) => a.questions.length - b.questions.length) : filterList.sort((a,b) => a.questions.length - b.questions.length);
    renderData(sort)
})

document.querySelector("#sortDecrease").addEventListener("click", () => {
    let sort = filterList.length < 1 ? testList.sort((a,b) => b.questions.length - a.questions.length) : filterList.sort((a,b) => b.questions.length - a.questions.length);
    renderData(sort);
})


renderData();