const letterArray = ['a', 'b', 'c'];
const options = [
    [
        {text: 'a', correct: true},
        {text: 'c', correct: false},
        {text: 'b', correct: false},
    ],
    [
        {text: 'a', correct: true},
        {text: 'c', correct: false},
        {text: 'b', correct: false},
    ],
    [
        {text: 'a', correct: true},
        {text: 'c', correct: false},
        {text: 'b', correct: false},
    ]
]

const question = document.getElementById('question-src')
const ansButtons = document.getElementById('ans-btns')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0, score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    const currentQuestion = letterArray[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    console.log(currentQuestion);
    question.src = `../videos/${currentQuestion}.mp4`;

    options[currentQuestionIndex].forEach(option => {
        const button = document.createElement("buttons");
        button.innerHTML = option.text;
        console.log(option);
        // add a css class after making one for option buttons
        button.classList.add("option-button");
        ansButtons.appendChild(button);
    });
}






startQuiz();