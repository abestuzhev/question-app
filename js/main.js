
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

function createModal(title, content){
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <div class="modal-title">${title}</div>
        <div class="modal-content">${content}</div>
    `;

    document.body.appendChild(modal);
    console.log(modal);
}

//auth.js
function getAuthForm(){
    return `
    <form action="" id="question-form">
        <div class="questions-form__item">
            <label class="question-form-label" for="question-form-input">Введите вопрос</label>
            <input type="text" id="question-form-input" class="question-form-input">
        </div>
        <div class="questions-form__item">
            <button disabled type="submit" class="c-btn" id="question-form-btn">Add question</button>
        </div>
    </form>
    `
}


//app.js
let form = document.getElementById('question-form');
let input = form.querySelector('#question-form-input');
let submitBtn = form.querySelector('#question-form-btn');
let questionList = form.querySelector('.questions-list');
let allBtn = document.querySelector('.question-all__btn');
let layout = document.querySelector('.questions-layout');

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


// function openModal(){
//     createModal('Авторизация', getAuthForm());
// }


// modal window
const $ = {};
window.$ = $;


function _createModal(options) {
    const modal = document.createElement('div');
    modal.classList.add('modal-layout');

    modal.insertAdjacentHTML('afterbegin', `        
        <div class="modal" style="width: ${options.width + 'px'}">
            <div class="modal-close" data-close="true"></div>
            <div class="modal-title">${options.title}</div>
            <div class="modal-content"></div>
            <div class="modal-footer">
                <a href="#" class="c-btn c-btn-primery">Ок</a>
                <a href="#" class="c-btn c-btn-cancel">Отмена</a>
            </div>
        </div>
        <div class="modal-overlay" data-close="true"></div>        
    `);

    document.body.appendChild(modal);
    return modal;
}


$.modal = function(options){
    const $modal = _createModal(options);  
    return {
        open (){
            $modal.classList.add('open');
        },

        close (){
            $modal.classList.remove('open');
        }
    }
}


const modal = $.modal({
    'width': 500,
    'title': 'Авторизация',
    'close': true,
    'content': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam non rerum, provident vero magni adipisci ducimus sint dolorem excepturi, itaque tempo.'
    
});

document.addEventListener('click', (event)=> {
    if(event.target.dataset.close){
        modal.close();
    }
    
})
allBtn.addEventListener('click', (event) => {
    event.preventDefault();
    modal.open();
}); 
