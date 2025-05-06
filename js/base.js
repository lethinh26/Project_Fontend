let toast = document.querySelector("#loadToast");
let toastBody = document.querySelector(".toast-body");
let toastBootstrap = new bootstrap.Toast(toast);

let innerError = `<img src="../../assets/icons/error.png" alt="" style="height: 25px"/>`;
let innerSuccess = `<img src="../../assets/icons/success.png" alt="" style="height: 25px"/>`;


function resetForm(form) {
    form.querySelectorAll("input").forEach((item) => {
        item.value = "";
        item.classList.remove("is-valid", "is-invalid");
    })
}

// toast

function checkValid(element, type, message, showMessage = true) {
    if (type === "text") {
        let value = element.value;
        let valid = value !== "" && value.length <= 30;

        if (!valid) {
            let errorMsg = value === "" ? `${message} không được để trống` : `${message} quá dài`;
            showToast(element, false, errorMsg, showMessage);
        }

        showToast(element, valid, "", false);
        return valid;
    }

    if (type === "radio") {
        let selected = Array.from(element).some(item => item.checked);

        element.forEach(item => {
            showToast(item, selected, "", false);
            if (!selected && showMessage) {
                showToast(item, false, `Phải chọn ${message}`, true);
            }
        });

        return selected;
    }

    return false;
}


function showToast(element, isValid, message = "", showMessage = true) {
    if (element) {
        element.classList.remove("is-valid", "is-invalid");
        element.classList.add(isValid ? "is-valid" : "is-invalid");
    }

    if (showMessage) {
        toast.classList.remove("bg-danger", "bg-success");
        toast.classList.add(isValid? "bg-success" : "bg-danger");
        toastBody.innerHTML = (isValid? innerSuccess + message : innerError + message);
        toastBootstrap.show();
    }
}
//

// modal

// function processModal(type, id) {
//     if (type === "add") {
//         addBtn();
//     }else if (type === "edit") {
//         document.querySelector("#deleteModal .btn-confirm").setAttribute("data-id", id);
//     }else if (type === "delete") {
//         document.querySelector("#deleteModal .btn-confirm").setAttribute("data-id", id);
//     }
// }
//