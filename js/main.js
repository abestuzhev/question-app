
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

    static getQuestion(){
        fetch('https://question-app-850ec.firebaseio.com/questions.json')
        .then(response => {
            console.log(response.headers.get('Content-Type'))
            return response.json();
        })
        .then( (data)=> {
            addList(data);
        });
        
    }   
}


// utils.js

function isValid(value){
    return value.length >= 10;
}

function addList (data){
    // return `
    // <div class="question-card">
    //     <div class="question-card__title">${data.text}</div>
    //     <div class="question-card__date">${data.date}</div>
    // </div>            
    // `
    const arr = Object.keys(data);

    console.log(arr);
}



let form = document.getElementById('question-form');
let input = form.querySelector('#question-form-input');
let submitBtn = form.querySelector('#question-form-btn');
let questionList = form.querySelector('.questions-list');

form.addEventListener('submit', submitEventHandler);

input.addEventListener('input', ()=> {
    submitBtn.disabled = !isValid(input.value);
});


Question.getQuestion();


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

