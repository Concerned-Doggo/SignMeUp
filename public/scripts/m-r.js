const questions = [
  {
    video: "../videos/n.mp4",
    ans: [
      { text: "M", correct: false },
      { text: "O", correct: false },
      { text: "P", correct: false },
      { text: "N", correct: true },
    ],
  },
  {
    video: "../videos/q.mp4",
    ans: [
      { text: "R", correct: false },
      { text: "Q", correct: true },
      { text: "N", correct: false },
      { text: "P", correct: false },
    ],
  },
  {
    video: "../videos/o.mp4",
    ans: [
      { text: "M", correct: false },
      { text: "N", correct: false },
      { text: "P", correct: false },
      { text: "O", correct: true },
    ],
  },
  {
    video: "../videos/p.mp4",
    ans: [
      { text: "R", correct: false },
      { text: "O", correct: false },
      { text: "P", correct: true },
      { text: "N", correct: false },
    ],
  },
  {
    video: "../videos/r.mp4",
    ans: [
      { text: "R", correct: true },
      { text: "M", correct: false },
      { text: "N", correct: false },
      { text: "P", correct: false },
    ],
  },
  {
    video: "../videos/m.mp4",
    ans: [
      { text: "P", correct: false },
      { text: "M", correct: true },
      { text: "O", correct: false },
      { text: "N", correct: false },
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
  resetQuestion();
  const currentQuestion = questions[currentQuestionIndex];
  const questionIndex = currentQuestionIndex + 1;

  console.log(currentQuestion);
  questionElement.innerHTML = `${questionIndex})`;
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
