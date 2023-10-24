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

// refrencing HTML DOM elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const videoElement = document.getElementById("video");
const sourceElement = document.getElementById("source");
const progressBar = document.getElementById("progress-bar-js");
const scoreBoard = document.getElementById("scoreBoardJs");
const scoreHeading = document.getElementById("score-heading");
const playAgainButton = document.getElementById("playAgainJs");

// setting max value for Progress Bar
progressBar.max = questions.length;

// initial score
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  // removing previous question and its options
  resetQuestion();

  const currentQuestion = questions[currentQuestionIndex];
  const questionIndex = currentQuestionIndex + 1;
  progressBar.value = questionIndex;

  questionElement.innerHTML = `${questionIndex})`;

  // changing video
  videoElement.pause();
  videoElement.setAttribute("src", currentQuestion.video);
  videoElement.load();

  // changing the text inside answer buttons
  currentQuestion.ans.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    // storing data wheater our option is correct or not
    button.dataset.correct = answer.correct;

    // adding style
    button.classList.add("option-btn");

    answerButtons.appendChild(button);

    button.addEventListener("click", () => {
      if (button.dataset.correct === "true") {
        // selected option is correct
        button.style.backgroundColor = "lightgreen";
        score++;
      } else if (button.dataset.correct === "false") {
        // selected option is wrong
        button.style.backgroundColor = "#FF6969";
      }

      Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          // marking the actual correct answer with greenColor
          button.style.backgroundColor = "lightgreen";
        }
        // we don't want user to choose any other option so we disable the click
        button.disabled = true;
        button.style.cursor = "no-drop";
      });
    });
  });
}

function resetQuestion() {
  // removing scoreboard if placed previously
  scoreBoard.classList.add("none");

  // removing the previous option buttons from answerBttons div
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function scoreTitle() {
  if (score > questions.length - 3) {
    return `Congratulations! Your Score is: ${score} out of ${questions.lenght} 🎉`;
  } else if (score < questions.length - 3 && score > 1) {
    return `Your Score is: ${score} out of ${questions.lenght} 😃`;
  } else {
    return `You just took a big Fat 🇱, Score: ${score}`;
  }
}

function showScore() {
  resetQuestion();
  // displaying scoreBoard
  scoreBoard.classList.remove("none");
  scoreBoard.classList.add("score-card");

  scoreHeading.classList.remove("none");

  scoreHeading.innerText = scoreTitle();
  nextButton.classList.add("none");
  // nextButton.innerText = "Play Again!";
}

function handleNextButtton() {
  // console.log(videoElement.style.height);
  // if (videoElement.style.height === "0px") {
  //   console.log("in");
  //   videoElement.style.height = "400px";
  // }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

playAgainButton.addEventListener("click", () => {
  console.log("inside");
  scoreBoard.classList.remove("score-card");
  scoreBoard.classList.add("none");

  nextButton.classList.remove("none");

  startQuiz();
});

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButtton();
  } else {
    startQuiz();
  }
});
showQuestion();
