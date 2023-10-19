const questions = [
    {
        question: "Which is largest animal in the ocean?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Dolphin", correct: false},
            {text: "Octopus", correct: false},
        ]
    },
    {
        question: "Which is longest river in Cambodia?",
        answers: [
            {text: "Bassac River", correct: false},
            {text: "Sarb River", correct: false},
            {text: "Chaktomuk River", correct: false},
            {text: "Mekong River", correct: true},
            
        ]
    },
    {
        question: "What is the capital city of Cambodia?",
        answers: [
            {text: "Siem Reap", correct: false},
            {text: "Ta khmav", correct: false},
            {text: "Phnom Penh", correct: true},
            {text: "Battdombong", correct: false},
            
        ]
    },
    {
        question: "Angkor Wat temple belongs to?",
        answers: [
            {text: "China", correct: false},
            {text: "Siam", correct: false},
            {text: "Cambodia", correct: true},
            {text: "Youn", correct: false},
            
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + 
    currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.
        length}!`;
        nextButton.innerHTML = "Play Again!";
        nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else
    startQuiz();
})

startQuiz();
