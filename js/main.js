
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
            response.id = response.name;
            return question
        })
        .then(addToLocalStorage)
        .then(Question.renderList);
    }

    static renderList(){
        const questions = getQuestionFromLocalStorage();
        const html = questions.length ?
        questions.map(toCart) 
        : `<div>Вы пока ничего не спрашивали</div>`;

        const list = document.querySelector('.questions-list');
        list.innerHTML = html;
    }
  
}

function toCart (question){
    return `
    <div class="question-card">
    <div class="question-card__date">${new Date(question.date).toLocaleDateString()}</div>
    <div class="question-card__text">${question.text}</div>
    </div>
    `
}

function addToLocalStorage (question){
    const all = getQuestionFromLocalStorage();
    all.push(question);
    localStorage.setItem('question', JSON.stringify(all))
}

function getQuestionFromLocalStorage (){
    return JSON.parse(localStorage.getItem('question') || '[]');
}

// utils.js

function isValid(value){
    return value.length >= 10;
}



let form = document.getElementById('question-form');
let input = form.querySelector('#question-form-input');
let submitBtn = form.querySelector('#question-form-btn');
let questionList = form.querySelector('.questions-list');

form.addEventListener('submit', submitEventHandler);

input.addEventListener('input', ()=> {
    submitBtn.disabled = !isValid(input.value);
});

document.addEventListener('load', Question.renderList()); 




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

