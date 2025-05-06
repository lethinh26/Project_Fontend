let testList = JSON.parse(localStorage.getItem("test")) || [];
let categoryList = JSON.parse(localStorage.getItem("category")) || [];

let getUrl = new URLSearchParams(window.location.search);
let mode = getUrl.get("mode");
let isEdit = mode? true : false
let testEdit = testList.find(test => test.id === Number(getUrl.get("id")));
let isEditImage = false;

let questionList = isEdit? testEdit.questions : [];

let inputModal = document.querySelector("#inputModal");
let inputAnswer = document.querySelector("#answer");
let inputQ = document.querySelector("#inputQ");
let inputTitle = document.querySelector("#inputTitle");
let inputTime = document.querySelector("#inputTime");
let selectCategory = document.querySelector("#category");
let countInput;

let chooseImage = document.querySelector("#chooseImage");
let uploadImage = document.querySelector("#uploadImage");
let image = null;
let imageName = isEdit? testEdit.imageName : null;


document.addEventListener("DOMContentLoaded", () => {
    categoryList.forEach((item) => {
        document.querySelector(".form-select").innerHTML += `
            <option value="${item.id}">${item.categoryEmoji} ${item.categoryName}</option>`;
    });

    if (isEdit) {
        inputTitle.value = testEdit.testName;
        inputTime.value = testEdit.playTime;
        selectCategory.value = testEdit.categoryId;
        document.querySelector("header h1").innerText = "Sửa bài test";
        document.querySelector(".btn-main").innerText = "Lưu"
        document.querySelector("#imageText").value = imageName;
        renderQuestions();
    }
});

chooseImage.addEventListener("click", () => {
    uploadImage.click();
})

uploadImage.addEventListener("change", () => {
    image = uploadImage.files[0];
    if (isEdit) isEditImage = true;
    imageName = image.name;
    if (image) {
        document.querySelector("#imageText").value = image.name;
    }
});


const checkModalValid = () => {
    let isValid = true;
    let showedToast = false;

    if (!checkValid(inputQ, "text", "Câu hỏi")) {
        showedToast = true;
        isValid = false;
    }

    document.querySelectorAll(".answer").forEach((item, index) => {
        if (!checkValid(item, "text", `Câu trả lời <u><b>${index + 1}</b></u>`, !showedToast)) {
            isValid = false;
            showedToast = true;
        }
    });

    if (!checkValid(document.querySelectorAll("input[name=answer]"), "radio", "câu trả lời đúng", !showedToast)) {
        isValid = false;
    }
    return isValid;
}

const loadData = (data) => {
    renderQuestions();
    resetForm(data)
}

const addInputAnswer = () => {
    countInput++;
    inputAnswer.innerHTML += createAnswerInput(countInput);
}

const deleteInputAnswer = (id) => {
    countInput--;
    document.getElementById(id).remove();
}



function openModal(id = null) {
    if (id !== null) {
        inputModal.setAttribute("data-id", id);
    } else {
        inputModal.removeAttribute("data-id");
    }

    renderModalContent(id);

    const bsModal = new bootstrap.Modal(inputModal);
    bsModal.show();
}

function renderModalContent(id = null) {
    let amount = id !== null ? questionList[id].answers.length : 4;
    let html = "";
    countInput = 0;

    while (countInput !== amount) {
        countInput++;
        html += createAnswerInput(countInput);
    }
    inputAnswer.innerHTML = html;

    if (id !== null) {
        inputQ.value = questionList[id].content;
        document.querySelectorAll(".answer").forEach((item, index) => {
            item.value = questionList[id].answers[index]?.content || "";
            if (questionList[id].answers[index].isCorrect === true) {
                document.querySelector(`input[name="answer"][value="${index+1}"]`).checked = true;
            }
        });

        inputModal.querySelector(".button").innerHTML = `
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" onclick="editModal('${id}')">Lưu</button>`
    }else {
        inputModal.querySelector(".button").innerHTML = `
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" onclick="addBtn()">Lưu</button>`
    }
}



function createAnswerInput(id) {
    return `
        <div class="input-group mb-3 position-relative" id="${id}">
            <div class="input-group-text z-1">
                <input type="radio" class="form-check-input" name="answer" value="${id}">
            </div>
            <input type="text" placeholder="Nhập câu trả lời" id="inputAnswer${id}" class="form-control answer">
            <button type="button" class="btn position-absolute z-0 border-0 p-0 fs-5 trash-btn" onclick="deleteInputAnswer('${id}')">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `;
}

function addBtn() {
    if (checkModalValid()) {
        showToast(null, true, "Thêm thành công");

        let answers = [];
        let selectedRadio = document.querySelector("input[name=answer]:checked");

        document.querySelectorAll(".answer").forEach((item, index) => {
            answers.push({content: item.value, isCorrect: index + 1 === Number(selectedRadio.value)});
        });

        questionList.push({content: inputQ.value, answers: answers});

        loadData(inputModal);
        bootstrap.Modal.getInstance(document.getElementById('inputModal')).hide();
    }
}

function deleteModal(id) {
    console.log(id)
    questionList.splice(Number(id), 1);
    showToast(null, true, "Xóa thành công");
    renderQuestions();
}

function editModal(id) {
    if (checkModalValid()) {
        showToast(null, true, "Sửa thành công");

        let answers = [];
        let selectedRadio = document.querySelector("input[name=answer]:checked");

        document.querySelectorAll(".answer").forEach((item, index) => {
            answers.push({content: item.value, isCorrect: index + 1 === Number(selectedRadio.value)});
        });

        questionList[Number(id)] = {content: inputQ.value, answers: answers};

        loadData(inputModal);
        bootstrap.Modal.getInstance(document.getElementById('inputModal')).hide();
    }
}

function renderQuestions() {
    document.querySelector("#tbody").innerHTML = questionList.reduce((temp, ques, index) =>
        temp + `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${ques.content}</td>
            <td>
                <button class="btn btn-primary" onclick="openModal('${index}')">Sửa</button>
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="document.querySelector('#deleteModal .btn-confirm').setAttribute('data-id', ${index})">Xóa</button>
            </td>
        </tr>
        `, '');
}

function createTest() {
    let isValid = true;
    let showedToast = false;

    if (!checkValid(inputTitle, "text", "Tên bài test")) {
        isValid = false;
        showedToast = true;
    }
    if (!checkValid(inputTime, "text", "Thời gian", !showedToast)) {
        isValid = false;
        showedToast = true;
    }
    if (!checkValid(selectCategory, "text", "Danh mục", !showedToast)) {
        isValid = false;
    }

    if (questionList.length < 1) {
        showToast(null, false, "Phải có ít nhất 1 câu hỏi")
        isValid = false;
    }

    if (isValid) {
        if (isEdit) {
            showToast(null, true, "Sửa bài test thành công");

            const indexEdit = testList.findIndex(test => test.id === testEdit.id);
            if (indexEdit === -1) {
                showToast(null, false, "Không tìm thấy bài test để sửa");
                return;
            }

            if (isEditImage && image) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(image);
                fileReader.onload = () => {
                    testList[indexEdit] = {
                        id: testEdit.id,
                        playAmount: testEdit.playAmount,
                        categoryId: Number(selectCategory.value.trim()),
                        playTime: Number(inputTime.value.trim()),
                        questions: questionList,
                        testName: inputTitle.value.trim(),
                        image: fileReader.result,
                        imageName: image.name
                    };
                    localStorage.setItem("test", JSON.stringify(testList));
                    location.href = "./product-manager.html";
                };
            } else {
                testList[indexEdit] = {
                    id: testEdit.id,
                    playAmount: testEdit.playAmount,
                    categoryId: Number(selectCategory.value.trim()),
                    playTime: Number(inputTime.value.trim()),
                    questions: questionList,
                    testName: inputTitle.value.trim(),
                    image: testEdit.image,
                    imageName: imageName
                };
                localStorage.setItem("test", JSON.stringify(testList));
                location.href = "./product-manager.html";
            }
        }else {
            showToast(null, true, "Tạo bài test thành công");
            if (!image) {
                testList.push(
                    {
                        categoryId: Number(selectCategory.value.trim()),
                        id: testList.length+1,
                        playAmount: 0,
                        playTime: Number(inputTime.value.trim()),
                        questions: questionList,
                        testName: inputTitle.value.trim(),
                        image: "../../assets/imgs/quizz-forge.png",
                        imageName: "Image Default"
                    }
                );
                localStorage.setItem("test", JSON.stringify(testList));
            }else {
                let fileReader = new FileReader();
                fileReader.readAsDataURL(image)
                fileReader.onload = () => {
                    testList.push(
                        {
                            categoryId: Number(selectCategory.value.trim()),
                            id: testList.length+1,
                            playAmount: 0,
                            playTime: Number(inputTime.value.trim()),
                            questions: questionList,
                            testName: inputTitle.value.trim(),
                            image: fileReader.result,
                            imageName: image.name
                        }
                    );
                    localStorage.setItem("test", JSON.stringify(testList));
                }
            }
        }
        location.href = "./product-manager.html"
    }
}


