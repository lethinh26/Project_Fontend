let getUrl = new URLSearchParams(window.location.search);
let idTest = Number(getUrl.get("idTest"));

let user = localStorage.getItem("user") || sessionStorage.getItem("user");
user = user ? JSON.parse(user) : null;

let test = JSON.parse(localStorage.getItem('test'));
let questions = test.find(item => item.id === idTest).questions;

let questionEl = document.querySelector("#question");
let questionListEl = document.querySelector("#listQuestions");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#username").innerText = `Thí sinh: ${user.username}`;
})

let timer;

function renderQuestions() {
    let html = "";
    questions.forEach((question, index) => {
        html += `
        <div class="question bg-white mb-4 p-3 rounded rounded-3" id="question${index + 1}">
            <h5>Câu ${index+1}:</h5>
            <h4>${question.content}</h4>
            <div class="mb-3">
                <div class="hr position-relative">
                    <hr>
                    <p class="position-absolute">Chọn một đáp án đúng</p>
                </div>
                <div class="mt-3">
`
        question.answers.forEach(answer => {
            html += `
                    <input type="radio" name="answer${index+1}" value="${answer.content}" onchange="markAnswered(${index})">
                    <label>${answer.content}</label><br>
            `
        });
        html += `
                </div>
            </div>
        </div>`;
    });

    questionEl.innerHTML = html;
}

function renderQuestionList() {
    let html = "";
    questions.forEach((question, index) => {
        let questNum = index + 1;
        html += `<a class="btn btn-outline-secondary me-1 mb-2" href="#question${questNum}">
            ${questNum}
         </a>`;

    });
    questionListEl.innerHTML = html;
}


function submitTest() {
    let total = questions.length;
    let correct = 0;

    questions.forEach((question, index) => {
        let selected = document.querySelector(`input[name="answer${index + 1}"]:checked`);
        let correctAnswer = question.answers.find(ans => ans.isCorrect).content;
        if (selected && selected.value === correctAnswer) {
            correct++;
        }
    });

    let wrong = total - correct;
    let score = Math.round((correct / total) * 10);

    let doneModal = document.querySelector('#btn-done');

    doneModal.querySelector("#score").innerHTML = `Điểm: <span class="text-yellow fw-bold text-decoration-underline"> ${score}</span>`
    doneModal.querySelector("#correct").innerHTML = `Số câu trả lời đúng: <span class="text-success"> &nbsp; ${correct}</span>`;
    doneModal.querySelector("#wrong").innerHTML = `Số câu trả lời sai: <span class="text-danger"> &nbsp; ${wrong}</span>`;
    doneModal.querySelector("#total").innerHTML = `Tổng số câu hỏi: ${total}`;

    let modal = new bootstrap.Modal(document.getElementById('btn-done'));
    modal.show();
    clearInterval(timer);
}

function startCount(minutes) {
    let totalSeconds = minutes * 60;
    let timeEl = document.getElementById("time");

    timer = setInterval(() => {
        let min = Math.floor(totalSeconds / 60);
        let sec = totalSeconds % 60;
        let hour = Math.floor(min / 60);
        min = min % 60;

        if (hour < 10) {
            hour = `0${hour}`;
        }
        if (min < 10) {
            min = `0${min}`;
        } if (sec < 10) {
            sec = `0${sec}`;
        }

        timeEl.innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${hour}:${min}:${sec}`;

        totalSeconds--;

        if (totalSeconds < 0) {
            clearInterval(timer);
            submitTest();
        }
    }, 1000);
}


function markAnswered(index) {
    let questNum = index + 1;
    let select = document.querySelector(`input[name="answer${questNum}"]:checked`);

    if (select) {
        const btnList = document.querySelectorAll("#listQuestions a");
        const btn = btnList[index];
        btn.classList.remove("btn-outline-secondary");
        btn.classList.add("btn-success");
    }
}

renderQuestions();
renderQuestionList();
startCount(test.find(item => item.id === idTest).playTime);
