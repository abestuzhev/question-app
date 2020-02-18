
// question.js

class Question {
    static creat(question){
        return fetch('https://question-app-850ec.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })
    }
}

// utils.js

function isValid(value){
    return value.length >= 10;
}



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
        Question.creat(question).then( () => {

            input.value = '';
            submitBtn.disabled = false;
            console.log('question', question);
        });

    }
}

