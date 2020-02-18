let form = document.getElementById('question-form');
let input = form.querySelector('#question-form-input');
let submitBtn = form.querySelector('#question-form-btn');

form.addEventListener('submit', submitEventHandler);

input.addEventListener('input', ()=> {
    submitBtn.disabled = !isValid(input.value);
});

function submitEventHandler (event) {
    event.preventDefault();

    if(isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submitBtn.disabled = true;
        // Asynk request to server
        input.value = '';
        console.log('question', question);

    }
}


// utils.js

function isValid(value){
    return value.length >= 10;
}