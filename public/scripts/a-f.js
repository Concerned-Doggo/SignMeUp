const questions = [
  {
    video: "../videos/a.mp4",
    ans: [
      { text: "A", correct: true },
      { text: "B", correct: false },
      { text: "C", correct: false },
      { text: "F", correct: false },
    ],
  },
  {
    video: "../videos/c.mp4",
    ans: [
      { text: "A", correct: false },
      { text: "B", correct: false },
      { text: "C", correct: true },
      { text: "F", correct: false },
    ],
  },
  {
    video: "../videos/f.mp4",
    ans: [
      { text: "D", correct: false },
      { text: "B", correct: false },
      { text: "F", correct: true },
      { text: "C", correct: false },
    ],
  },
  {
    video: "../videos/d.mp4",
    ans: [
      { text: "A", correct: false },
      { text: "C", correct: false },
      { text: "E", correct: false },
      { text: "D", correct: true },
    ],
  },
  {
    video: "../videos/b.mp4",
    ans: [
      { text: "A", correct: false },
      { text: "B", correct: true },
      { text: "E", correct: false },
      { text: "D", correct: false },
    ],
  },
  {
    video: "../videos/e.mp4",
    ans: [
      { text: "B", correct: false },
      { text: "C", correct: false },
      { text: "E", correct: true },
      { text: "D", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const videoElement = document.getElementById("video");
const sourceElement = document.getElementById("source");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  videoElement.style.display = "block";
  score = 0;
  currentQuestionIndex = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  nextButton.classList.add("grid-btns");
  resetQuestion();
  const currentQuestion = questions[currentQuestionIndex];
  const questionIndex = currentQuestionIndex + 1;

  console.log(currentQuestion);
  // questionElement.innerHTML = `${questionIndex})`;
  videoElement.pause();
  videoElement.setAttribute("src", currentQuestion.video);
  videoElement.load();
  // videoElement.play();
  // source.setAttribute("type", "video/mp4");

  currentQuestion.ans.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.dataset.correct = answer.correct;
    button.classList.add("register-btn");
    button.classList.add("grid-btns");
    answerButtons.appendChild(button);

    button.addEventListener("click", () => {
      if (answer.correct) {
        button.classList.add("correct");
        score++;
      } else button.classList.add("incorrect");

      Array.from(answerButtons.children).forEach((button) => {
        console.log(answerButtons);
        console.log(button.correct);
        if (button.dataset.correct === "true") button.classList.add("correct");
        button.disabled = true;
      });
    });
  });
}

function resetQuestion() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showScore() {
  resetQuestion();
  videoElement.style.display = "none";
  questionElement.innerHTML = `Your Score is ${score} Out Of ${questions.length}!`;
  nextButton.innerHTML = "Play Again!";
  nextButton.classList.add()
}

function handleNextButtton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButtton();
  } else {
    startQuiz();
  }
});
showQuestion();
