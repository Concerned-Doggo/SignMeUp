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

const jsConfetti = new JSConfetti();

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

  jsConfetti.clearCanvas();
  // removing the previous option buttons from answerBttons div
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function scoreTitle() {
  if (score > questions.length - 3) {
    return `Congratulations! Your Score is: ${score} out of ${questions.length} 🎉`;
  } else if (score < questions.length - 3 && score > 1) {
    return `Your Score is: ${score} out of ${questions.length} 😃`;
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

  if (score > 4) {
    jsConfetti.addConfetti({
      confettiColors: [
        "#ff0a54",
        "#ff477e",
        "#ff7096",
        "#ff85a1",
        "#fbb1bd",
        "#f9bec7",
      ],
      emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
    });
  }
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
