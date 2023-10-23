const questions = [
  {
    video: "../videos/h.mp4",
    ans: [
      { text: "G", correct: false },
      { text: "L", correct: false },
      { text: "H", correct: true },
      { text: "K", correct: false },
    ],
  },
  {
    video: "../videos/k.mp4",
    ans: [
      { text: "L", correct: false },
      { text: "J", correct: false },
      { text: "K", correct: true },
      { text: "h", correct: false },
    ],
  },
  {
    video: "../videos/i.mp4",
    ans: [
      { text: "H", correct: false },
      { text: "L", correct: false },
      { text: "G", correct: false },
      { text: "I", correct: true },
    ],
  },
  {
    video: "../videos/j.mp4",
    ans: [
      { text: "I", correct: false },
      { text: "J", correct: true },
      { text: "G", correct: false },
      { text: "H", correct: false },
    ],
  },
  {
    video: "../videos/g.mp4",
    ans: [
      { text: "L", correct: false },
      { text: "K", correct: false },
      { text: "H", correct: false },
      { text: "G", correct: true },
    ],
  },
  {
    video: "../videos/l.mp4",
    ans: [
      { text: "H", correct: false },
      { text: "K", correct: false },
      { text: "L", correct: true },
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
  // videoElement.style.display = "block";
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
    button.classList.add("option-btn");
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
  // videoElement.style.display = "none";

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
