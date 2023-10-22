const questions = [
  {
    video: "../videos/z.mp4",
    ans: [
      { text: "Y", correct: false },
      { text: "S", correct: false },
      { text: "U", correct: false },
      { text: "Z", correct: true },
    ],
  },
  {
    video: "../videos/w.mp4",
    ans: [
      { text: "U", correct: false },
      { text: "X", correct: false },
      { text: "W", correct: true },
      { text: "S", correct: false },
    ],
  },
  {
    video: "../videos/x.mp4",
    ans: [
      { text: "X", correct: true },
      { text: "V", correct: false },
      { text: "U", correct: false },
      { text: "Y", correct: false },
    ],
  },
  {
    video: "../videos/s.mp4",
    ans: [
      { text: "T", correct: false },
      { text: "S", correct: true },
      { text: "V", correct: false },
      { text: "Z", correct: false },
    ],
  },
  {
    video: "../videos/u.mp4",
    ans: [
      { text: "U", correct: true },
      { text: "S", correct: false },
      { text: "T", correct: false },
      { text: "W", correct: false },
    ],
  },
  {
    video: "../videos/t.mp4",
    ans: [
      { text: "W", correct: false },
      { text: "Z", correct: false },
      { text: "U", correct: false },
      { text: "T", correct: true },
    ],
  },
  {
    video: "../videos/v.mp4",
    ans: [
      { text: "W", correct: false },
      { text: "V", correct: true },
      { text: "U", correct: false },
      { text: "T", correct: false },
    ],
  },
  {
    video: "../videos/y.mp4",
    ans: [
      { text: "Z", correct: false },
      { text: "V", correct: false },
      { text: "Y", correct: true },
      { text: "X", correct: false },
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
