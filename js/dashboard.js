let categoryList = JSON.parse(localStorage.getItem("category"));
let testList = JSON.parse(localStorage.getItem("test"));
let cardTest = document.querySelector("#cardTest");
let filterTest = [...testList];

let currentPage = 1;
let item = 6;

function randomTest() {
    if (!checkLogin()) {
        let currentTest = testList.length;
        let random = Math.floor(Math.random() * currentTest) + 1;
        location.href= `./test.html?idTest=${random}`
    }
}

function renderData(list = filterTest) {
    let start = (currentPage-1) * item;
    let end = start + item;
    list = list.slice(start, end);
    cardTest.innerHTML = list.reduce((temp, test) => temp + `
    <div style="width: 32%">
        <div class="card rounded-3 border-0 shadow" style="background-color: #fff2cf; height: 350px;">
          <img class="object-fit-cover rounded-top-3" style="height: 50%" src="${test.image}" alt="">
          <div class="card-body position-relative py-5">
            <div class="rounded rounded-3 position-absolute w-85 p-3" style="background-color: #FFF8F0; top: -15%; left: 7%">
              <div class="fs-5 fw-bold text-center m-0 p-0" id="testTitle">${test.testName}</div>
              <p class="card-text m-0">Danh mục: ${categoryList.find((item) => item.id === test.categoryId).categoryName}</p>
              <p class="card-text"><img src="../../assets/icons/gray_circle.png" alt="" style="width: 15px; height: 15px"> ${test.questions.length} câu hỏi</p>
              <p class="card-text"><img src="../../assets/icons/gray_circle.png" alt="" style="width: 15px; height: 15px"> ${test.playAmount} lượt chơi</p>
              <button class="btn d-flex m-auto btn-success" onclick="if (!checkLogin()) location.href='./test.html?idTest=${test.id}'">Chơi</button>
            </div>
          </div>
        </div>
      </div>
    `, "");
    pagination();
}

function searchTest() {
    let searchTest =  document.querySelector("#search-input").value.trim()
    filterTest = testList.filter((item) => item.testName.toLowerCase().includes(searchTest.toLowerCase()));
    currentPage = 1
    renderData(filterTest);
}

function pagination() {
    let totalPage = Math.ceil(filterTest.length / item);
    let pag = document.querySelector('.pagination');
    pag.innerHTML = `<li class="page-item ${currentPage===1? 'disabled' : ''}" data-page="${currentPage-1}"><a class="page-link" href="">&lt;</a></li>`
    for (let i = 1; i <= totalPage; i++) {
        pag.innerHTML += `<li class="page-item ${currentPage===i? 'active' : ''}" data-page="${i}"><a class="page-link" href="">${i}</a></li>`
    }
    pag.innerHTML += `<li class="page-item ${currentPage===totalPage? 'disabled' : ''}" data-page="${currentPage+1}"><a class="page-link"  href="">&gt;</a></li>`

    document.querySelectorAll(".page-item").forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            let page = item.getAttribute('data-page');
            if (page >=1 && page <= totalPage) {
                currentPage = Number(page);
                renderData();
            }
        })
    })
}

document.querySelector("#sortIncrease").addEventListener("click", () => {
    filterTest = filterTest.sort((a, b) => a.playAmount - b.playAmount);
    renderData();
})

document.querySelector("#sortDecrease").addEventListener("click", () => {
    filterTest = filterTest.sort((a, b) => b.playAmount - a.playAmount);
    renderData();
})


renderData();