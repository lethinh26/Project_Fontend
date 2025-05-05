let categoryList = JSON.parse(localStorage.getItem("category"));
let testList = JSON.parse(localStorage.getItem("test"));
let cardTest = document.querySelector("#cardTest");

function renderData(list = testList) {
    cardTest.innerHTML = list.reduce((temp, test) => temp + `
    <div style="width: 32%">
        <div class="card rounded-3 border-0 shadow" style="background-color: #fff2cf; height: 350px;">
          <img class="object-fit-cover rounded-top-3" style="height: 50%" src="${test.image}" alt="">
          <div class="card-body position-relative py-5">
            <div class="rounded rounded-3 position-absolute w-85 p-3" style="background-color: #FFF8F0; top: -15%; left: 7%">
              <div class="fs-5 fw-bold text-center m-0 p-0">${test.testName}</div>
              <p class="card-text m-0">Danh mục: ${categoryList.find((item) => item.id === test.categoryId).name}</p>
              <p class="card-text"><img src="../../assets/icons/gray_circle.png" alt="" style="width: 15px; height: 15px"> ${test.questions.length} câu hỏi</p>
              <p class="card-text"><img src="../../assets/icons/gray_circle.png" alt="" style="width: 15px; height: 15px"> ${test.playAmount} lượt chơi</p>
              <button class="btn d-flex m-auto btn-success">Chơi</button>
            </div>
          </div>
        </div>
      </div>
    `, "");
}
renderData();