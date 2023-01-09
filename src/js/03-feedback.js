
import throttle from 'lodash.throttle';

const filterForm = document.querySelector(`form.feedback-form`);

let writedInfo = {};
startForm();
function startForm() {
    let savedInfo = localStorage.getItem("feedback-form-state");
    if (savedInfo) {
        savedInfo = JSON.parse(savedInfo);
        Object.entries(savedInfo).forEach(([name, value]) => {
            writedInfo[name] = value
            filterForm.elements[name].value = value
        });
    };
};
filterForm.addEventListener(`submit`, formSubmit);
// filterForm.addEventListener(`submit`, ((event) => {
//     event.preventDefault();
//     console.log(writedInfo);
//     event.currentTarget.reset();
//     localStorage.clear();
// }));
filterForm.addEventListener(`input`, throttle(saveLocalStorage, 500));

function formSubmit(event) {
    event.preventDefault();
    // writedInfo[event.target.name] = event.target.value;
    console.log(writedInfo);
    removeInfo();
};
function removeInfo() {
    filterForm.reset();
    localStorage.removeItem("feedback-form-state");
    writedInfo = {};
};
function saveLocalStorage(evt) {
    writedInfo[evt.target.name] = evt.target.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(writedInfo));
};
// function checkForm() {
//     valid = true;
//     if (document.feedback.email.value == "") {
//         alert("Будь ласка, введіть вашу пошту");
//         valid = false;
//     }
//     if (document.feedback.message.value == "") {
//         alert("Будь ласка, введіть повідомлення");
//         valid = false;
//     }
//     return valid;
// };